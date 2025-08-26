import fs from "fs-extra";
import path from "path";

export class Template {

    public constructor(public templateDir: string, public targetDir: string) {}

    public async copyBase(): Promise<void> {
        await fs.copy(path.join(this.templateDir, "default"), this.targetDir, { overwrite: true });
        this.renameGitignore();
    }

    public async copyRenderer(unitSize: number): Promise<void> {
        const rendererDir = path.join(this.templateDir, "__renderer");
        await fs.copy(rendererDir, this.targetDir, { overwrite: true });

        const constPath = path.join(this.targetDir, "src", "common", "const.ts");
        let constContents = await fs.readFile(constPath, "utf-8");
        constContents = constContents.replace("{{UNIT_SIZE}}", unitSize.toString());
        await fs.writeFile(constPath, constContents, "utf-8");
    }

    private async renameGitignore(): Promise<void> {
        const gitignorePath = path.join(this.targetDir, "__gitignore");
        await fs.move(gitignorePath, path.join(this.targetDir, ".gitignore"));
    }

}