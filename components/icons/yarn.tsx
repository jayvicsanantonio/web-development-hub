import { ComponentProps } from "react";

export default function Yarn({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64">
      <g transform="matrix(1.42678 0 0 1.42678 -14.267802 -10.8034)">
        <path
          d="M32.428 7.572C44.81 7.572 54.856 17.617 54.856 30S44.81 52.428 32.428 52.428 10 42.383 10 30 20.045 7.572 32.428 7.572z"
          fill="#2c8ebb"
        />
        <path
          d="M47.686 36.798c-.156-1.23-1.195-2.078-2.53-2.06-1.992.026-3.663 1.056-4.77 1.74a10.38 10.38 0 0 1-1.126.615c.07-1.005.01-2.32-.51-3.767-.632-1.732-1.48-2.797-2.087-3.412.7-1.022 1.663-2.51 2.113-4.815.4-1.966.268-5.023-.623-6.737-.182-.346-.485-.598-.866-.7-.156-.043-.45-.13-1.03.035-.875-1.8-1.178-2-1.41-2.156-.485-.312-1.056-.38-1.593-.182-.72.26-1.334.953-1.914 2.182l-.234.528c-1.1.078-2.832.476-4.295 2.06-.182.2-.537.346-.91.485h.01c-.762.268-1.108.892-1.533 2.018-.59 1.576.017 3.126.615 4.13-.814.727-1.896 1.888-2.468 3.247-.7 1.68-.788 3.325-.762 4.217-.606.64-1.54 1.844-1.645 3.195-.14 1.888.546 3.17.85 3.637a2.41 2.41 0 0 0 .286.364c-.035.234-.043.485.01.745.113.606.494 1.1 1.074 1.41 1.143.606 2.736.866 3.966.25.442.468 1.247.918 2.7.918h.087c.372 0 5.1-.25 6.477-.59a3.15 3.15 0 0 0 1.316-.641c.883-.277 3.325-1.108 5.63-2.598 1.628-1.056 2.19-1.282 3.403-1.576 1.178-.286 1.914-1.36 1.767-2.546zm-2.06 1.273c-1.386.33-2.087.632-3.802 1.75-2.676 1.732-5.603 2.537-5.603 2.537s-.242.364-.944.528c-1.212.294-5.776.546-6.192.554-1.117.01-1.8-.286-1.992-.745-.58-1.386.83-1.992.83-1.992s-.312-.19-.494-.364c-.165-.165-.338-.494-.4-.372-.216.528-.33 1.818-.91 2.4-.797.805-2.303.537-3.195.07-.98-.52.07-1.74.07-1.74s-.528.312-.953-.33c-.38-.59-.736-1.593-.64-2.832.104-1.41 1.68-2.78 1.68-2.78s-.277-2.087.632-4.226c.823-1.948 3.04-3.516 3.04-3.516s-1.862-2.06-1.17-3.914c.45-1.212.632-1.204.78-1.256.52-.2 1.022-.416 1.394-.823 1.862-2.01 4.235-1.628 4.235-1.628s1.126-3.42 2.165-2.754c.32.208 1.472 2.77 1.472 2.77s1.23-.72 1.368-.45c.745 1.446.83 4.21.502 5.888-.554 2.77-1.94 4.26-2.494 5.196-.13.216 1.49.9 2.51 3.732.944 2.59.104 4.763.25 5.005l.035.06s1.082.087 3.256-1.256c1.16-.72 2.537-1.524 4.105-1.54 1.515-.026 1.593 1.75.45 2.026z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
