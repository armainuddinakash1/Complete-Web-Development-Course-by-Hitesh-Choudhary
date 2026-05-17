type Props = {
    params: {
        id: string;
    };
};

function UserProfile({ params }: Props) {
    const { id } = params;
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
            <section className="w-full max-w-2xl rounded-4xl border border-black/10 bg-white p-10 shadow-[0_35px_60px_-25px_rgba(0,0,0,0.2)] text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-black/60">
                    User details
                </p>
                <h1 className="mt-4 text-3xl font-black text-black">
                    User {id}
                </h1>
                <p className="mt-4 text-sm leading-7 text-black/75">
                    This page shows the authenticated user profile identifier in
                    a clean monochrome layout.
                </p>
            </section>
        </main>
    );
}

export default UserProfile;
