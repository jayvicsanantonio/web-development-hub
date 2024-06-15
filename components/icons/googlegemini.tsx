import { ComponentProps } from "react";

export default function GoogleGemini({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 344 127"
      fill="none"
    >
      <mask
        id="mask0_958_15881"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="344"
        height="127"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M234.123 41.2204C235.489 44.3354 236.172 47.6638 236.172 51.2055C236.172 47.6638 236.833 44.3354 238.156 41.2204C239.521 38.1054 241.356 35.3958 243.66 33.0916C245.965 30.7873 248.674 28.9738 251.789 27.651C254.904 26.2855 258.233 25.6028 261.774 25.6028C258.233 25.6028 254.904 24.9414 251.789 23.6185C248.674 22.2531 245.965 20.4182 243.66 18.114C241.356 15.8097 239.521 13.1001 238.156 9.98507C236.833 6.87007 236.172 3.54171 236.172 0C236.172 3.54171 235.489 6.87007 234.123 9.98507C232.801 13.1001 230.987 15.8097 228.683 18.114C226.379 20.4182 223.669 22.2531 220.554 23.6185C217.439 24.9414 214.111 25.6028 210.569 25.6028C214.111 25.6028 217.439 26.2855 220.554 27.651C223.669 28.9738 226.379 30.7873 228.683 33.0916C230.987 35.3958 232.801 38.1054 234.123 41.2204ZM26.1532 123.14C31.3762 125.291 36.9448 126.366 42.859 126.366C48.8501 126.366 54.3035 125.406 59.2192 123.486C64.1349 121.566 68.3978 118.839 72.0078 115.306C75.6178 111.773 78.4213 107.587 80.4183 102.748C82.4153 97.8321 83.4138 92.4555 83.4138 86.6181V86.5029C83.4138 85.4276 83.337 84.429 83.1834 83.5073C83.1066 82.5856 82.9914 81.6255 82.8377 80.627H43.0895V90.1897H73.0447C72.7374 94.7982 71.6621 98.7922 69.8187 102.172C68.0521 105.475 65.7863 108.201 63.0212 110.352C60.3329 112.502 57.2222 114.115 53.689 115.191C50.2326 116.189 46.6226 116.689 42.859 116.689C38.7114 116.689 34.6789 115.92 30.7617 114.384C26.8445 112.848 23.3497 110.621 20.2774 107.702C17.2819 104.783 14.9008 101.288 13.1342 97.2176C11.3676 93.07 10.4843 88.4231 10.4843 83.2769C10.4843 78.1308 11.3292 73.5223 13.019 69.4514C14.7856 65.3038 17.1667 61.809 20.1622 58.9671C23.1577 56.0484 26.6141 53.8209 30.5313 52.2848C34.5253 50.7486 38.6346 49.9805 42.859 49.9805C46.0082 49.9805 49.0037 50.403 51.8456 51.2479C54.6875 52.0159 57.299 53.1297 59.68 54.589C62.1379 56.0484 64.2501 57.815 66.0167 59.8888L73.1599 52.5152C69.7035 48.598 65.287 45.564 59.9105 43.4134C54.6107 41.2628 48.9269 40.1875 42.859 40.1875C37.0216 40.1875 31.4914 41.2628 26.2684 43.4134C21.1223 45.564 16.5522 48.598 12.5582 52.5152C8.64093 56.4324 5.5686 61.0025 3.34116 66.2255C1.11372 71.4484 0 77.1323 0 83.2769C0 89.4216 1.11372 95.1054 3.34116 100.328C5.5686 105.551 8.64093 110.121 12.5582 114.039C16.4754 117.956 21.0071 120.99 26.1532 123.14ZM104.058 122.334C108.512 125.022 113.582 126.366 119.266 126.366C125.717 126.366 131.132 124.907 135.511 121.988C139.889 119.07 143.23 115.383 145.534 110.928L136.778 106.78C135.165 109.699 132.937 112.157 130.096 114.154C127.33 116.151 123.874 117.149 119.726 117.149C116.5 117.149 113.39 116.343 110.394 114.73C107.399 113.117 104.941 110.697 103.021 107.472C101.362 104.684 100.419 101.266 100.194 97.2176H146.456C146.533 96.8336 146.571 96.3343 146.571 95.7199C146.648 95.1054 146.686 94.5293 146.686 93.9917C146.686 88.1542 145.534 82.9697 143.23 78.438C141.002 73.9063 137.776 70.3731 133.552 67.8385C129.327 65.227 124.297 63.9212 118.459 63.9212C112.698 63.9212 107.668 65.3806 103.366 68.2993C99.065 71.1412 95.7238 74.9432 93.3428 79.7053C91.0385 84.4674 89.8864 89.652 89.8864 95.259C89.8864 101.25 91.1153 106.588 93.5732 111.274C96.1079 115.959 99.6027 119.646 104.058 122.334ZM100.781 88.8071C101.143 87.0971 101.66 85.4841 102.329 83.9682C103.789 80.6654 105.901 78.054 108.666 76.1338C111.508 74.1367 114.811 73.1382 118.574 73.1382C121.723 73.1382 124.373 73.6759 126.524 74.7512C128.675 75.7497 130.441 77.0554 131.824 78.6684C133.206 80.2814 134.205 82.0096 134.819 83.853C135.434 85.6196 135.779 87.271 135.856 88.8071H100.781ZM155.497 65.7646V124.523H165.866V91.8026C165.866 88.5767 166.519 85.5428 167.825 82.7009C169.131 79.859 170.936 77.5931 173.24 75.9033C175.544 74.1367 178.156 73.2534 181.074 73.2534C185.145 73.2534 188.294 74.444 190.522 76.825C192.826 79.1293 193.978 83.0849 193.978 88.6919V124.523H204.232V91.5722C204.232 88.3463 204.885 85.3507 206.191 82.5856C207.496 79.7437 209.301 77.4779 211.606 75.7881C213.91 74.0983 216.521 73.2534 219.44 73.2534C223.588 73.2534 226.775 74.4056 229.003 76.7098C231.307 79.0141 232.459 82.9697 232.459 88.5767V124.523H242.713V86.8485C242.713 80.0126 241.023 74.4824 237.644 70.2579C234.341 66.0335 229.156 63.9212 222.09 63.9212C217.405 63.9212 213.372 64.9965 209.993 67.1472C206.613 69.2978 203.925 72.0245 201.928 75.3273C200.545 71.9477 198.279 69.221 195.13 67.1472C192.058 64.9965 188.333 63.9212 183.955 63.9212C181.497 63.9212 179.039 64.4205 176.581 65.419C174.2 66.3407 172.088 67.608 170.244 69.221C168.401 70.7572 166.942 72.4854 165.866 74.4056H165.405V65.7646H155.497ZM252.045 65.7646V124.523H262.299V65.7646H252.045ZM251.93 53.3217C253.389 54.7042 255.118 55.3955 257.115 55.3955C259.188 55.3955 260.917 54.7042 262.299 53.3217C263.682 51.8623 264.373 50.1341 264.373 48.1371C264.373 46.0633 263.682 44.3351 262.299 42.9526C260.917 41.4932 259.188 40.7635 257.115 40.7635C255.118 40.7635 253.389 41.4932 251.93 42.9526C250.547 44.3351 249.856 46.0633 249.856 48.1371C249.856 50.1341 250.547 51.8623 251.93 53.3217ZM271.929 65.7646V124.523H282.298V91.8026C282.298 88.6535 282.951 85.6964 284.257 82.9313C285.64 80.0894 287.521 77.7851 289.902 76.0185C292.283 74.1751 295.087 73.2534 298.313 73.2534C302.614 73.2534 306.071 74.444 308.682 76.825C311.293 79.1293 312.599 83.0849 312.599 88.6919V124.523H322.968V86.8485C322.968 79.9358 321.125 74.4056 317.438 70.2579C313.751 66.0335 308.336 63.9212 301.193 63.9212C296.969 63.9212 293.128 64.9581 289.672 67.032C286.216 69.1058 283.719 71.5637 282.183 74.4056H281.722V65.7646H271.929ZM331.672 65.7646V124.523H341.926V65.7646H331.672ZM331.557 53.3217C333.016 54.7042 334.745 55.3955 336.742 55.3955C338.815 55.3955 340.544 54.7042 341.926 53.3217C343.309 51.8623 344 50.1341 344 48.1371C344 46.0633 343.309 44.3351 341.926 42.9526C340.544 41.4932 338.815 40.7635 336.742 40.7635C334.745 40.7635 333.016 41.4932 331.557 42.9526C330.175 44.3351 329.483 46.0633 329.483 48.1371C329.483 50.1341 330.175 51.8623 331.557 53.3217Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_958_15881)">
        <rect
          x="-158.25"
          y="-455.443"
          width="832.09"
          height="685.324"
          fill="url(#paint0_linear_958_15881)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_958_15881"
          x1="-57.4049"
          y1="130.441"
          x2="354.97"
          y2="30.369"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#439DDF" />
          <stop offset="0.524208" stopColor="#4F87ED" />
          <stop offset="0.781452" stopColor="#9476C5" />
          <stop offset="0.888252" stopColor="#BC688E" />
          <stop offset="1" stopColor="#D6645D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
