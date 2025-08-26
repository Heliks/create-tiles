#!/usr/bin/env node
import { intro, text, confirm, outro, } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import { Template } from "./Template.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    intro("🚀 Create tiles Project");

    const projectName = await text({
        message: "Project name?",
        placeholder: "my-game",
        validate(value) {
            if (!value) return "Project name is required";
        }
    }) as string;

    const withPhysics = await confirm({
        message: "Include physics support?",
    });

    let unitSize: number | null = null;

    if (withPhysics) {
        unitSize = Number(await text({
            message: "Unit size (in pixels)?",
            placeholder: "16",
            validate(value) {
                const n = Number(value);
                if (!n || isNaN(n) || !Number.isInteger(n) || n <= 0) {
                    return "Unit size must be a positive number";
                }
            }
        }));
    }

    const targetDir = path.resolve(process.cwd(), projectName);
    await fs.ensureDir(targetDir);

    const templateDir = path.join(__dirname, "../templates");

    const templateEngine = new Template(templateDir, targetDir);
    await templateEngine.copyBase();

    if (withPhysics) {
        await templateEngine.copyRenderer(unitSize!);
    }

    outro(`✅ Project ready! cd ${projectName} && pnpm install && pnpm build:watch`);
}

main().catch(console.error);
