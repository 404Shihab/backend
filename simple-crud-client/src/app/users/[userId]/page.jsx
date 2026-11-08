import Link from "next/link";
import { notFound } from "next/navigation";
import { Chip, Avatar } from "@heroui/react";
import { getUserById } from "@/app/lib/data";

const getInitials = (name = "") =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const InfoItem = ({ label, children }) => (
    <div className="rounded-xl border border-border bg-background p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
        </p>
        <div className="mt-1.5">{children}</div>
    </div>
);

const UserDetailsPage = async ({ params }) => {
    const { userId } = await params;
    const user = await getUserById(userId);

    if (!user) notFound();

    const isAdmin = user.role === "admin";

    return (
        <div className="mx-auto w-full max-w-3xl p-6">
            <Link
                href="/users"
                className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
            >
                ← Back to users
            </Link>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                {/* Banner */}
                <div className="h-28 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />

                {/* Profile header */}
                <div className="px-6 pb-6">
                    <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <Avatar
                                size="lg"
                                className="size-24 border-4 border-surface text-2xl"
                            >
                                <Avatar.Fallback>
                                    {getInitials(user.name)}
                                </Avatar.Fallback>
                            </Avatar>
                            <div className="pb-1">
                                <h1 className="text-2xl font-semibold">
                                    {user.name}
                                </h1>
                                <p className="text-muted">{user.email}</p>
                            </div>
                        </div>

                        <Chip
                            variant="soft"
                            color={isAdmin ? "accent" : "default"}
                            className="capitalize"
                        >
                            {user.role}
                        </Chip>
                    </div>

                    {/* Details grid */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoItem label="Full name">
                            <p className="font-medium">{user.name}</p>
                        </InfoItem>

                        <InfoItem label="Email address">
                            <a
                                href={`mailto:${user.email}`}
                                className="font-medium hover:underline"
                            >
                                {user.email}
                            </a>
                        </InfoItem>

                        <InfoItem label="Role">
                            <p className="font-medium capitalize">{user.role}</p>
                        </InfoItem>

                        <InfoItem label="User ID">
                            <p className="break-all font-mono text-sm">
                                {user._id}
                            </p>
                        </InfoItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;