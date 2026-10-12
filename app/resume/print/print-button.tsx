"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrintButton() {
  return (
    <Button onClick={() => window.print()} className="print:hidden">
      <Printer size={16} className="mr-2" />
      Save as PDF
    </Button>
  );
}
