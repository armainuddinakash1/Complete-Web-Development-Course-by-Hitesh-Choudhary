"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

type UserProfile = {
  _id?: string;
  username?: string;
  email?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState("");

  const profileId = useMemo(() => params?.id || "", [params]);

  const fetchProfile = useCallback(async () => {
    if (!profileId) {
      setError("User id is missing from route params.");
      setLoadingProfile(false);
      return;
    }

    try {
      setLoadingProfile(true);
      setError("");

      const response = await axios.get(`/api/users/${profileId}`);
      const fetchedUser = response.data?.data || response.data?.user || null;
      setUser(fetchedUser ? { ...fetchedUser, _id: profileId } : null);
    } catch (profileError: unknown) {
      if (axios.isAxiosError(profileError)) {
        setError(
          profileError.response?.data?.error ||
            "Unable to load profile. Please login again."
        );
      } else {
        setError("Unable to load profile. Please try again.");
      }
    } finally {
      setLoadingProfile(false);
    }
  }, [profileId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      setError("");
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (logoutError: unknown) {
      if (axios.isAxiosError(logoutError)) {
        setError(
          logoutError.response?.data?.error ||
            "Logout endpoint is not ready yet. Please try again."
        );
      } else {
        setError("Unable to logout right now. Please try again.");
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
            <p className="mt-1 text-sm text-slate-600">
              User details loaded using route params.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>

        {error ? (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {loadingProfile ? (
          <div className="mt-6 space-y-3">
            <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-56 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 p-4">
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Username:</span>{" "}
                {user?.username || "Not available"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                {user?.email || "Not available"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">User ID:</span>{" "}
                {profileId || "Not available"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={fetchProfile}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Refresh profile
          </button>
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
}
