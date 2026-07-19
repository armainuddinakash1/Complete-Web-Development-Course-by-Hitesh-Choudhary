"use client";

import VideoCard from "@/components/VideoCard";
import { Video } from "@/generated/prisma/browser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function HomePage() {
    const [video, setVideo] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVideos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get<Video[]>("/api/videos");
            if (response.data && Array.isArray(response.data)) {
                setVideo(response.data);
            } else {
                setError("Invalid response data");
            }
        } catch (err) {
            console.error("Error fetching videos:", err);
            setError("Failed to fetch videos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* <h1 className="text-5xl text-center p-4">Home Page</h1> */}
            <div className=" pt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {video.map((v) => (
                    <VideoCard
                        key={v.id}
                        video={v}
                        onDownload={handleDownload}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
