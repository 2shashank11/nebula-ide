import React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 md:p-10">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center brightness-30 opacity-50"
        style={{
          backgroundImage: "url('/images/bubble-bg.jpg')",
        }}
      />

      <div className="flex w-full max-w-md flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="text-xl">Nebula IDE</span>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
