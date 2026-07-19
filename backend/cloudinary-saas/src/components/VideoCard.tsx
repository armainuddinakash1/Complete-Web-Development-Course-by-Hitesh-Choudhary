"use client";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import React, { useCallback, useEffect, useState } from "react";
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@/generated/prisma/browser";

dayjs.extend(relativeTime);

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video",
        });
    }, []);
    const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,
        });
    }, []);
    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "mp4",
            quality: "auto",
            rawTransformations: [
                "e_preview:duration_15.0:max_seg_5:min_seg_dur_3.0",
            ],
        });
    }, []);

    const formatSize = useCallback((size: number) => {
        return filesize(size, { round: 1 });
    }, []);

    const formatDuration = useCallback((duration: number | string) => {
        const numericDuration =
            typeof duration === "string" ? Number(duration) : duration;
        const totalSeconds = Math.floor(numericDuration);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }, []);

    const compressionRatio = useCallback(
        (originalSize: number, compressedSize: number) => {
            if (originalSize === 0) return 0;
            return ((originalSize - compressedSize) / originalSize) * 100;
        },
        [],
    );

    useEffect(() => {
        setPreviewError(false);
    }, [video.publicId]);

    const handlePreviewError = () => {
        setPreviewError(true);
    };

    return (
        <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => {
                setPreviewError(false);
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure
                className="aspect-video relative"
                onMouseEnter={() => {
                    setPreviewError(false);
                    setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered ? (
                    previewError ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <p className="text-red-500">
                                Preview not available
                            </p>
                        </div>
                    ) : (
                        <video
                            src={getPreviewVideoUrl(video.publicId)}
                            poster={getThumbnailUrl(video.publicId)}
                            autoPlay
                            muted
                            loop
                            playsInline
                            disablePictureInPicture
                            controlsList="nodownload"
                            preload="metadata"
                            className="w-full h-full object-cover"
                            onError={handlePreviewError}
                            onCanPlay={() => setPreviewError(false)}
                        />
                    )
                ) : (
                    <img
                        src={getThumbnailUrl(video.publicId)}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
                    <Clock size={16} className="mr-1" />
                    {formatDuration(video.duration)}
                </div>
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold">{video.title}</h2>
                <p className="text-sm text-base-content opacity-70 mb-4">
                    {video.description}
                </p>
                <p className="text-sm text-base-content opacity-70 mb-4">
                    Uploaded {dayjs(video.createdAt).fromNow()}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                        <FileUp size={18} className="mr-2 text-primary" />
                        <div>
                            <div className="font-semibold">Original</div>
                            <div>{formatSize(Number(video.originalSize))}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FileDown size={18} className="mr-2 text-secondary" />
                        <div>
                            <div className="font-semibold">Compressed</div>
                            <div>
                                {formatSize(Number(video.compressedSize))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm font-semibold">
                        Compression:{" "}
                        <span className="text-accent">
                            {compressionRatio(
                                Number(video.originalSize),
                                Number(video.compressedSize),
                            ).toFixed(0)}
                            %
                        </span>
                    </div>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                            onDownload(
                                getFullVideoUrl(video.publicId),
                                video.title,
                            )
                        }
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
