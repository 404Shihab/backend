"use client";

import { useRouter } from "next/navigation";
import { Table, Chip, Button, Tooltip, Avatar } from "@heroui/react";
import { Pencil, TrashBin, Eye } from "@gravity-ui/icons";

const getInitials = (name) =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const UsersTable = ({ users = [], onEdit, onDelete }) => {
    const router = useRouter();

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                    <h2 className="text-lg font-semibold">Users</h2>
                    <p className="text-sm text-muted">
                        Manage your team members and their roles
                    </p>
                </div>
                <Chip size="sm" variant="soft">
                    {users.length} total
                </Chip>
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Users table">
                        <Table.Header>
                            <Table.Column isRowHeader>NAME</Table.Column>
                            <Table.Column>EMAIL</Table.Column>
                            <Table.Column>ROLE</Table.Column>
                            <Table.Column className="text-end">ACTIONS</Table.Column>
                        </Table.Header>

                        <Table.Body
                            renderEmptyState={() => (
                                <div className="py-10 text-center text-muted">
                                    No users found
                                </div>
                            )}
                        >
                            {users.map((user) => (
                                <Table.Row key={user._id} id={user._id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="sm">
                                                <Avatar.Fallback>
                                                    {getInitials(user.name)}
                                                </Avatar.Fallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {user.name}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-muted">
                                            {user.email}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="soft"
                                            color={
                                                user.role === "admin"
                                                    ? "accent"
                                                    : "default"
                                            }
                                            className="capitalize"
                                        >
                                            {user.role}
                                        </Chip>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onPress={() =>
                                                    router.push(`/users/${user._id}`)
                                                }
                                            >
                                                <Eye width={16} height={16} />
                                                Details
                                            </Button>

                                            <Tooltip delay={0}>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="ghost"
                                                    aria-label="Edit user"
                                                    onPress={() => onEdit?.(user)}
                                                >
                                                    <Pencil width={16} height={16} />
                                                </Button>
                                                <Tooltip.Content>
                                                    <p>Edit user</p>
                                                </Tooltip.Content>
                                            </Tooltip>

                                            <Tooltip delay={0}>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-danger"
                                                    aria-label="Delete user"
                                                    onPress={() => onDelete?.(user)}
                                                >
                                                    <TrashBin width={16} height={16} />
                                                </Button>
                                                <Tooltip.Content>
                                                    <p>Delete user</p>
                                                </Tooltip.Content>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default UsersTable;