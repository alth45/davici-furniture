import React from "react";
import ShopClient from "@/components/shopClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our extensive collection of chairs, tables, and sofas.',
};


export default function ShopPage() {
    return (
        <ShopClient />
    )
}