import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Input, Button, Select, RTE } from "../../components/index";
import service from "../../appwrite/conf";

const PostForm = ({ post }) => {
  const {
    setValue,
    getValues,
    control,
    watch,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((store) => store.auth.userData);

  const submit = async (data) => {
    console.log(data);
    if (post) {
      console.log(post)
      const file = data.image[0]
        ? await service.uploadFile(data?.image[0])
        : null;
        console.log(file)
      if (file) {
        await service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      console.log("Inside else");
      const file = await service.uploadFile(data.image[0]);
      console.log(file);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap bg-white p-6 rounded-xl shadow-md border border-gray-200 gap-6"
    >
      {/* Left section: Text inputs */}
      <div className="w-full lg:w-2/3 px-2 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {post ? "Update Your Post" : "Create a New Post"}
        </h2>

        <Input
          label="Title"
          placeholder="Enter post title"
          className="mb-2"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="auto-generated or custom slug"
          className="mb-2"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right section: Image and status */}
      <div className="w-full lg:w-1/3 px-2 space-y-6">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="mb-2"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="rounded-lg overflow-hidden shadow border border-gray-300">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-2 text-black"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-600" : "bg-blue-600"}
          className="w-full text-white py-3 rounded-xl shadow hover:opacity-90 transition"
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
