import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/village/home";

export const Route = createFileRoute("/")({ component: HomePage });
