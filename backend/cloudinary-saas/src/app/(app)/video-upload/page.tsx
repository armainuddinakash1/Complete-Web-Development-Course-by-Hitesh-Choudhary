"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === "string") {
            return data;
        }

        if (data && typeof data === "object") {
            const maybeData = data as Record<string, unknown>;
            if (typeof maybeData.error === "string") {
                return maybeData.error;
            }
            if (typeof maybeData.message === "string") {
                return maybeData.message;
            }
            if (typeof maybeData.msg === "string") {
                return maybeData.msg;
            }
        }

        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Error uploading video.";
}

function VideoUploadPage() {
    const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    // max file size 70MB
    const MAX_FILE_SIZE = 70 * 1024 * 1024;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File size exceeds the maximum limit of 70MB.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("originalSize", file.size.toString());

        try {
            const response = await axios.post("/api/video-upload", formData, {
                timeout: 15 * 60 * 1000,
            });
            if (response.status === 200) {
                const publicId = response.data?.video?.publicId ?? response.data?.publicId;
                setUploadedVideo(publicId ?? null);
                toast.success("Video uploaded successfully!");
                router.push(`/`);
            }
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            toast.error(message);
            console.error("Error uploading video:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Video File</span>
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
}

export default VideoUploadPage;
