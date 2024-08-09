import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [urlToImage, setUrlToImage] = useState("");
  const [description, setDescription] = useState("");
  const [readMoreContent, setReadMoreContent] = useState("");

  async function formSubmit(e) {
    e.preventDefault();

    const query = `
      mutation CreateNews($input: CreateNewsInput!) {
        createNews(createNewsInput: $input) {
          id
          url
          title
          author
          urlToImage
          description
          publishedAt
          readMoreContent
        }
      }
    `;

    const variables = {
      input: {
        url,
        title,
        author,
        urlToImage,
        description,
        readMoreContent,
        publishedAt: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch("http://5.39.222.209:5001/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      alert("Data Saved Successfully");
      setUrl("");
      setTitle("");
      setAuthor("");
      setUrlToImage("");
      setDescription("");
      setReadMoreContent("");
    } catch (error) {
      alert("Error submitting form:", error);
    }
  }

  return (
    <div className="container-lg px-md-5 px-3 mt-3">
      <form className="px-sm-5 mx-lg-5" onSubmit={formSubmit}>
        <h1 className="text-center mb-5">
          <u>News Details</u>
        </h1>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="Title"
            value={title}
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            rows={3}
            className="form-control"
            id="Description"
            value={description}
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ReadMoreContent" className="form-label">
            Read More Content
          </label>
          <textarea
            rows={3}
            className="form-control"
            id="ReadMoreContent"
            autoComplete="off"
            value={readMoreContent}
            onChange={(e) => setReadMoreContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="Author"
            value={author}
            autoComplete="off"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="PageURL" className="form-label">
            Page URL
          </label>
          <input
            type="text"
            className="form-control"
            id="PageURL"
            value={url}
            autoComplete="off"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ImageURL" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="ImageURL"
            value={urlToImage}
            autoComplete="off"
            onChange={(e) => setUrlToImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
