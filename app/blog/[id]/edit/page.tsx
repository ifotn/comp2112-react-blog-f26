'use client';

import PageTitle from "@/app/components/pageTitle";
import { useForm, Controller } from "react-hook-form";
import { Post } from "@/app/types/post";
import { useRouter } from "next/navigation";
import SimpleWysiwyg from "react-simple-wysiwyg";
import { useSessionCounter } from "@/app/context/globalContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {getPostCssPlugins} from "next/dist/build/webpack/config/blocks/css/plugins";

interface PostFormData {
    title: string;
    content: string;
}

// event handler for rte to update value user has entered for blog post content
interface SimpleWysiwygChangeEvent {
    target: {
        value: string;
    }
}

export default async function EditPost({ params }: { params: { id: string }}) {
    // get id param from url
    const { id } = useParams<{ id: string }>();
    // console.log(id);

    // used for redirecting after save
    const router = useRouter();

    // get username from global context
    const { username } = useSessionCounter();

    // make page private - if no global context username var, redirect to login
    if (!username) {
        //router.push('/auth/login');
        window.location.href = '/auth/login';
        return;
    }

    // get selected Post from api
    // get api domain from .env ; ! at the end is just a null check
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;
    let post: Post;

   // useEffect(async () => {
   //  const getPost() = async () => {
   //      const res: Response = await fetch(`${apiDomain}/posts/${id}`);
   //      post = await res.json();
   //  }
   //
   //  getPost)(;)
   //}, []);

    // set up react-hook-form w/existing post values
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful }} = useForm<PostFormData>({
        defaultValues: {
            title: '',
            content: ''
        }
    });

    const onSubmit = async (data: PostFormData) => {
        console.log(`Submitted: `, data);

        try {
            // try making new blog post at external api
            const payload = {
                title: data.title,
                content: data.content,
                author: username // get username from global context
            };



            // call api using PUT (http method for modifying a resource) using id as url param
            const response: Response = await fetch(`${apiDomain}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include' // include cookies w/jwt
            });

            // hopefully we get a success response
            const apiResponse: Post = await response.json();
            console.log(apiResponse);


            router.push("/blog");
        }
        catch (error: unknown) {
            console.log(error);
        }
    }

    return (
        <main>
            <h1>Edit Blog Post</h1>
            <PageTitle title="Edit Blog Post" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="title">Title: *</label>
                    <input {...register("title", { required: "Title is required"})} />
                    {errors.title && <span className="error">{errors.title.message}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Content: *</label>
                    {/*<textarea {...register("content", { required: "Content is required"})}></textarea>*/}
                    <Controller name="content" control={control} rules={{ required: "Content is required" }}
                                render={({ field }) => (
                                    <SimpleWysiwyg className="rte" value={field.value}
                                                   onChange={(e) => field.onChange(e.target.value)} />
                                )} />
                    {errors.content && <span className="error">{errors.content.message}</span>}
                </fieldset>
                <button>Save</button>
                {isSubmitSuccessful && <p className="success">Post Updated</p>}
            </form>
        </main>
    )
}