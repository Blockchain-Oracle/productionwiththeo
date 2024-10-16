// app/providers.js
"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    // api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    api_host: "/ingest", //enable this to ensure when addBlocker turned on allow post-hog
    ui_host: "https://us.posthog.com",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogWrapper>{children} </PostHogWrapper>
    </PostHogProvider>
  );
}

export function PostHogWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth(); //this works in client while auth if for server
  const userInfo = useUser();
  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user?.emailAddresses[0]?.emailAddress,
        name: userInfo.user?.fullName,
      });
    } else if (!auth.isSignedIn) {
      posthog.reset();
    }
  }, [auth, userInfo]);
  return children;
}
