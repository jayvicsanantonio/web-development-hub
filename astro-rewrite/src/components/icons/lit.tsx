import { ComponentProps } from "react";

export default function LitIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      aria-label="Lit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      id="full"
    >
      <symbol id="flame-symbol" viewBox="0 0 160 200">
        <path
          fill="var(--lit-logo-dark-cyan, #00e8ff)"
          d="M40 120l20-60l90 90l-30 50l-40-40h-20"
        ></path>
        <path
          fill="var(--lit-logo-dark-blue, #283198)"
          d="M80 160 L80 80 L120 40 L 120 120 M0 160 L40 200 L40 120 L20 120"
        ></path>
        <path
          fill="var(--lit-logo-blue, #324fff)"
          d="M40 120v-80l40-40v80M120 200v-80l40-40v80M0 160v-80l40 40"
        ></path>
        <path fill="var(--lit-logo-cyan, #0ff)" d="M40 200v-80l40 40"></path>
      </symbol>
      <use href="#flame-symbol"></use>
    </svg>
  );
}
