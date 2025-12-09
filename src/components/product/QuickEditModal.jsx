import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody, ModalHeader, Input, Button } from "@windmill/react-ui";
import { FiX } from "react-icons/fi";
import ProductServices from "@/services/ProductServices";
import { toast } from "react-toastify";

const QuickEditModal = ({ isOpen, onClose, product, onUpdate }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        price: "",
        stock: "",
    });

    useEffect(() => {
        if (product && isOpen) {
            setFormData({
                title: product.title?.en || product.title || "",
                slug: product.slug || "",
                price: product.prices?.price || product.prices?.originalPrice || 0,
                stock: product.stock || 0,
            });
        }
    }, [product, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update product with new values
            const updateData = {
                title: {
                    ...product.title,
                    en: formData.title,
                },
                slug: formData.slug,
                prices: {
                    ...product.prices,
                    price: formData.price,
                },
                stock: formData.stock,
            };

            await ProductServices.updateProduct(product._id, updateData);
            toast.success(t("Product updated successfully"));
            onUpdate();
            onClose();
        } catch (error) {
            toast.error(error.message || t("Failed to update product"));
        } finally {
            setLoading(false);
        }
    };

    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{t("Quick Edit")}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t("Product Name")}
                        </label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t("Slug")}
                        </label>
                        <Input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            className="mt-1"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t("Price")}
                        </label>
                        <Input
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1"
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t("Stock")}
                        </label>
                        <Input
                            name="stock"
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            className="mt-1"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            layout="outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {t("Cancel")}
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? t("Updating...") : t("Update")}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default QuickEditModal;

