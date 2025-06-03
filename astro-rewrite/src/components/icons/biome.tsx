import { ComponentProps } from "react";

export default function BiomeIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 410 404"
      version="1.0"
    >
      <g transform="translate(-51.097 -92.304)" stroke-linecap="square">
        <path
          id="emblem"
          d="m225.8 92.304-76.751 132.93c29.122-8.9782 60.452-10.309 90.821-3.146l25.939 6.1226-24.404 103.48-25.976-6.1224c-19.954-4.7072-40.754-0.043-56.841 12.674-8.0467 6.3645-14.386 14.355-18.731 23.319l-24.01-11.616c6.0744-12.545 14.955-23.736 26.172-32.616 22.439-17.761 51.695-24.284 79.549-17.712l12.165-51.574c-43.577-10.273-89.504-0.0432-124.61 27.744-35.106 27.785-55.611 70.142-55.611 114.91l344.58 0.01z"
          fill="#60a5fa"
          strokeWidth="26.257"
          style={{ paintOrder: "markers fill stroke" }}
        />
      </g>
    </svg>
  );
}
