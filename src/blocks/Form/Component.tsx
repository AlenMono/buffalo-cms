'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { AlertCircle, CheckCircle } from 'lucide-react'

export type FormBlockType = {
    blockName?: string
    blockType?: 'formBlock'
    enableIntro: boolean
    form: FormType
    introContent?: DefaultTypedEditorState
    label?: string
}

export const FormBlock: React.FC<
    {
        id?: string
    } & FormBlockType
> = (props) => {
    const {
        enableIntro,
        form: formFromProps,
        form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
        introContent,
    } = props

    const formMethods = useForm({
        defaultValues: formFromProps.fields,
    })
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = formMethods

    const [isLoading, setIsLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState<boolean>()
    const [error, setError] = useState<{ message: string; status?: string } | undefined>()
    const router = useRouter()

    const onSubmit = useCallback(
        (data: FormFieldBlock[]) => {
            let loadingTimerID: ReturnType<typeof setTimeout>
            const submitForm = async () => {
                setError(undefined)

                const dataToSend = Object.entries(data).map(([name, value]) => ({
                    field: name,
                    value,
                }))

                // delay loading indicator by 1s
                loadingTimerID = setTimeout(() => {
                    setIsLoading(true)
                }, 1000)

                try {
                    const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
                        body: JSON.stringify({
                            form: formID,
                            submissionData: dataToSend,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                    })

                    const res = await req.json()

                    clearTimeout(loadingTimerID)

                    if (req.status >= 400) {
                        setIsLoading(false)

                        setError({
                            message: res.errors?.[0]?.message || 'Internal Server Error',
                            status: res.status,
                        })

                        return
                    }

                    setIsLoading(false)
                    setHasSubmitted(true)

                    if (confirmationType === 'redirect' && redirect) {
                        const { url } = redirect

                        const redirectUrl = url

                        if (redirectUrl) router.push(redirectUrl)
                    }
                } catch (err) {
                    console.warn(err)
                    setIsLoading(false)
                    setError({
                        message: 'Something went wrong.',
                    })
                }
            }

            if (confirmationType === 'message') {
                setTimeout(() => {
                    setHasSubmitted(false)
                }, 8000)
            }

            void submitForm()
        },
        [router, formID, redirect, confirmationType],
    )

    return (
        <div className='xl:max-w-[550px]'>
            {enableIntro && introContent && !hasSubmitted && (
                <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
            )}
            <div>
                <FormProvider {...formMethods}>
                    {isLoading && !hasSubmitted ?
                        <div className="max-w-2xl animate-pulse space-y-6">
                            <div className="space-y-2">
                                <div className="h-4 w-24 rounded bg-primary-dark"></div>
                                <div className="h-11 w-full rounded-md bg-primary-dark"></div>
                            </div>

                            <div className="flex gap-2">
                                <div className='flex-1 space-y-2'>
                                    <div className="h-4 w-16 rounded bg-primary-dark"></div>
                                    <div className="h-11 w-full rounded-md bg-primary-dark"></div>
                                </div>

                                <div className='flex-1 space-y-2'>
                                    <div className="h-4 w-28 rounded bg-primary-dark"></div>
                                    <div className="h-11 w-full rounded-md bg-primary-dark"></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-20 rounded bg-primary-dark"></div>
                                <div className="h-40 w-full rounded-md bg-primary-dark"></div>
                            </div>

                            <div className="h-11 w-36 rounded-md bg-brand"></div>
                        </div> :
                        <>
                            <form id={formID} onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap gap-2'>
                                {formFromProps &&
                                    formFromProps.fields &&
                                    formFromProps.fields?.map((field: any, index) => {
                                        field.width = 100;
                                        const isHalf = field.name === "email" || field.name === "phone";
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                                        if (Field) {
                                            return (
                                                <div style={{ width: window.innerWidth > 768 && isHalf ? '49%' : '100%' }} key={index}>
                                                    <Field
                                                        form={formFromProps}
                                                        {...field}
                                                        {...formMethods}
                                                        control={control}
                                                        errors={errors}
                                                        register={register}
                                                        label={field.label}
                                                    />
                                                </div>
                                            )
                                        }
                                        return null
                                    })}

                                <div className='pt-2'>
                                    <Button form={formID} type="submit" size="md" variant="default">
                                        {submitButtonLabel}
                                    </Button>
                                </div>
                            </form>
                        </>
                    }

                    {error &&
                        <div className='bg-red-200 rounded-lg p-4 mt-4 flex items-center gap-2'>
                            <AlertCircle width="18" className='min-w-[18px]' />
                            {`${error.status || '500'}: ${error.message || ''}`}
                        </div>
                    }


                    {!isLoading && hasSubmitted && confirmationType === 'message' && (
                        <div className='bg-green-300 rounded-lg p-4 mt-4 flex items-center gap-2'>
                            <CheckCircle width="18" />
                            <RichText data={confirmationMessage} paragraphClassName='font-satoshi text-sm !m-0' />
                        </div>
                    )}
                </FormProvider>
            </div>
        </div>
    )
}
