import { useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    apiKey: string;
    onApiKeyChange: (value: string) => void;
}

export function SettingsModal({
    isOpen,
    onClose,
    apiKey,
    onApiKeyChange,
}: Props) {
    const [showApiKey, setShowApiKey] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-surface-2 border border-app rounded-xl shadow-2xl w-full max-w-lg flex flex-col animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-modal-title"
            >
                <div className="p-4 border-b border-app flex justify-between items-center bg-surface-3 rounded-t-xl">
                    <h3 className="font-bold text-app text-lg" id="settings-modal-title">
                        设置
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="关闭"
                        className="text-muted hover:text-app transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-app" htmlFor="api-key-input">
                            FFLogs V2 Client Key
                        </label>
                        <div className="relative">
                            <input
                                id="api-key-input"
                                type={showApiKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={(e) => onApiKeyChange(e.target.value)}
                                className="w-full bg-surface-1 border border-app rounded-lg px-3 py-2 text-sm text-app placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-(--color-focus)"
                                placeholder="Enter your Client Key"
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-app transition-colors"
                                aria-label={showApiKey ? 'Hide API Key' : 'Show API Key'}
                            >
                                {showApiKey ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09" />
                                        <line x1="2" x2="22" y1="2" y2="22" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-muted">
                            需要 FFLogs V2 API Client Credential 的 Client ID (不是 Client Secret)
                        </p>
                    </div>


                </div>

                <div className="p-4 border-t border-app flex justify-end bg-surface-3 rounded-b-xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-surface-1 border border-app hover:bg-surface-4 transition-colors text-app"
                    >
                        完成
                    </button>
                </div>
            </div>
        </div>
    );
}
