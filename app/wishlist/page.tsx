import WhisListClient from "@/components/whisListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Whislist',
  description: '',
};

export default function WhishlistPage() {
    return (
        <WhisListClient />
    )
}