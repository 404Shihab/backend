"use client";

import { useState } from "react";
import { Plus, Person } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";

const AddUserModal = ({ createUserAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const newUser = {
            name: formData.get("name")?.toString().trim(),
            email: formData.get("email")?.toString().trim(),
            role: formData.get("role")?.toString() || "user",
        };

        try {
            setIsSubmitting(true);
            const result = await createUserAction?.(newUser);

            if (result?.insertedId) {
                setIsOpen(false);
            } else {
                setError("Could not add the user. Please try again.");
            }
        } catch (err) {
            console.error("Failed to add user:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button onPress={() => setIsOpen(true)}>
                <Plus width={16} height={16} />
                Add User
            </Button>

            <Modal.Backdrop
                isOpen={isOpen}
                onOpenChange={(open) => {
                    if (!isSubmitting) setIsOpen(open);
                }}
            >
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Person className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Add New User</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Enter the details of the new team member.
                            </p>
                        </Modal.Header>

                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="flex flex-col gap-4 p-6">
                                <TextField
                                    className="w-full"
                                    name="name"
                                    type="text"
                                    variant="secondary"
                                    isRequired
                                >
                                    <Label>Name</Label>
                                    <Input placeholder="Enter full name" />
                                </TextField>

                                <TextField
                                    className="w-full"
                                    name="email"
                                    type="email"
                                    variant="secondary"
                                    isRequired
                                >
                                    <Label>Email</Label>
                                    <Input placeholder="Enter email address" />
                                </TextField>

                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="role"
                                        className="text-sm font-medium"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        defaultValue="user"
                                        className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                {error && (
                                    <p className="text-sm text-danger">{error}</p>
                                )}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    type="button"
                                    slot="close"
                                    variant="secondary"
                                    isDisabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" isDisabled={isSubmitting}>
                                    {isSubmitting ? "Adding..." : "Add User"}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default AddUserModal;