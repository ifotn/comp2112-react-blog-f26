import PageTitle from "@/app/components/pageTitle";

export default function CreatePost() {
    return (
        <main>
            <h1>Create New Blog Post</h1>
            <PageTitle title="Create New Blog Post" />
            <form>
                <fieldset>
                    <label htmlFor="title">Title: *</label>
                    <input name="title" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Content: *</label>
                    <textarea name="content" required></textarea>
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}