import { ExecException } from "child_process";
import { DownloadedMetadata } from "./DownloadedMetadata";

export type DownloadFunctionAfterDownloadCallback = (
	error: ExecException | null,
	stdout: string,
	stderr: string
) => void;

export type DownloadFunction = (
    query: string,
) => Promise<DownloadedMetadata>