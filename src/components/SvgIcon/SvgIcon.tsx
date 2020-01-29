import React from 'react';

const SVG_ICONS = {
    'ordersManage': () => (
        <svg width="1em" height="1em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M460.2 849.8h-232c-11.1 0-20.4-10.2-20.4-22.2v-635c0-12 9.3-22.2 20.4-22.2h514.7c11.1 0 20.4 10.2 20.4 22.2v312.1c0 16.6 13.4 30 30 30s30-13.4 30-30V192.6c0-45.3-36.1-82.2-80.4-82.2H228.1c-44.3 0-80.4 36.9-80.4 82.2v634.9c0 45.3 36.1 82.2 80.4 82.2h232c16.6 0 30-13.4 30-30s-13.4-29.9-29.9-29.9z"  /><path fill="#333333" d="M856.1 783.3c-11.8-8.1-18.9-21.5-18.9-35.8 0-14.2 7-27.6 18.6-35.6l13.6-9.5-5.6-15.5c-7.5-21.1-18.8-40.5-33.6-57.5l-10.7-12.3-14.7 6.9c-5.8 2.7-12 4.1-18.3 4.1-22.6 0-41.2-16.9-43.3-39.4l-1.5-16.3-16-3c-21.9-4.1-44.7-4.1-66.5 0l-16 3-1.5 16.3c-2 22.5-20.7 39.4-43.3 39.4-6.3 0-12.6-1.4-18.3-4.1l-14.7-6.9-10.7 12.3c-14.7 17-25.9 36.4-33.6 57.5l-5.6 15.5 13.6 9.5c11.7 8.2 18.6 21.5 18.6 35.6 0 14.3-7.1 27.8-18.9 35.8l-13.6 9.3 5.4 15.6c7.3 21.1 18.4 40.5 32.9 57.6l10.8 12.7 15.1-7.3c5.9-2.9 12.3-4.3 18.9-4.3 22.8 0 41.9 17.8 43.4 40.5l1.1 16.7 16.5 3c10.9 2 22.1 3 33.2 3 11.1 0 22.3-1 33.2-3l16.5-3 1.1-16.7c1.5-22.7 20.6-40.5 43.4-40.5 6.7 0 13 1.5 18.9 4.3l15.1 7.3 10.8-12.7c14.5-17.1 25.6-36.5 32.9-57.6l5.4-15.6-13.7-9.3z m-48.7 43.1c-6.8-1.6-13.7-2.5-20.8-2.5-39.2 0-72.9 26.5-83.2 62.9-7.2 0.5-14.5 0.5-21.7 0-10.3-36.4-44-62.9-83.2-62.9-7.1 0-14 0.9-20.8 2.5-4.1-6-7.8-12.4-10.9-18.9 15.3-15.9 24.1-37.4 24.1-59.9 0-22.3-8.6-43.5-23.6-59.3 3.2-6.8 7-13.2 11.3-19.4 6.5 1.5 13.1 2.3 19.8 2.3 21.7 0 42.5-8.1 58.5-22.7 11.5-10.5 19.8-23.8 24.2-38.4 7.5-0.6 15.1-0.6 22.6 0 4.5 14.6 12.8 27.9 24.2 38.4 16 14.6 36.7 22.7 58.5 22.7 6.8 0 13.4-0.8 19.8-2.3 4.3 6.1 8.1 12.6 11.3 19.4-15 15.9-23.6 37.1-23.6 59.3 0 22.6 8.8 43.9 24.1 59.9-2.9 6.5-6.6 12.8-10.6 18.9z"  /><path fill="#333333" d="M692.5 671.7c-42.2 0-76.6 34.3-76.6 76.6 0 42.2 34.3 76.6 76.6 76.6s76.6-34.3 76.6-76.6-34.4-76.6-76.6-76.6z m0 110.1c-18.5 0-33.6-15.1-33.6-33.6s15.1-33.6 33.6-33.6 33.6 15.1 33.6 33.6-15.1 33.6-33.6 33.6zM651.8 296H319.1c-16.6 0-30 13.4-30 30s13.4 30 30 30h332.7c16.6 0 30-13.4 30-30s-13.4-30-30-30z m30 186.1c0-16.6-13.4-30-30-30H319.1c-16.6 0-30 13.4-30 30s13.4 30 30 30h332.7c16.6 0 30-13.4 30-30zM319.6 608.2c-16.6 0-30 13.4-30 30s13.4 30 30 30h139.8c16.6 0 30-13.4 30-30s-13.4-30-30-30H319.6z"  /></svg>
    ),
    'purchaseManage': () => (
        <svg width="1em" height="1em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M959.3 951.1h-0.2c-11-0.1-19.9-9.2-19.8-20.2l0.8-79.1H239c-11 0-20-9-20-20s9-20 20-20h741.6l-1.2 119.6c-0.2 10.8-9.1 19.7-20.1 19.7zM192.3 800c-11 0-20-8.9-20-20l-0.3-640.6-83-49.3c-9.5-5.6-12.6-17.9-7-27.4s17.9-12.6 27.4-7L212 116.6l0.2 663.4c0.1 11-8.9 20-19.9 20z"  /><path fill="#333333" d="M161.9 960c-54 0-97.9-43.9-97.9-97.9 0-54 43.9-97.9 97.9-97.9 54 0 97.9 43.9 97.9 97.9 0 54-43.9 97.9-97.9 97.9z m0-155.8c-31.9 0-57.9 26-57.9 57.9s26 57.9 57.9 57.9 57.9-26 57.9-57.9-26-57.9-57.9-57.9zM850.1 761.6H339.4c-22.1 0-40-17.9-40-40V148c0-22.1 17.9-40 40-40h510.7c22.1 0 40 17.9 40 40v573.6c0 22-17.9 40-40 40zM339.4 148v573.6h510.7V148H339.4z"  /><path fill="#333333" d="M708.5 360.2l-105.4-81-122 75.4V142.1h40v140.8l84.5-52.2 62.9 48.3V142.1h40z"  /></svg>
    ),
    'customersManage': () => (
        <svg width="1em" height="1em" viewBox="0 0 1103 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M555.122545 992.512186H34.224972A34.224972 34.224972 0 0 1 0 958.287214a476.405609 476.405609 0 0 1 596.533511-460.662622 34.224972 34.224972 0 1 1-17.111986 66.395945A407.956665 407.956665 0 0 0 68.449944 924.063242h486.673601a34.224972 34.224972 0 0 1 0 68.448944z"  /><path fill="#333333" d="M476.063609 550.672548A273.796775 273.796775 0 1 1 749.859385 276.876773a275.507774 275.507774 0 0 1-273.795776 273.795775z m0-482.223604A205.346832 205.346832 0 1 0 681.409441 273.796775 207.05883 207.05883 0 0 0 476.063609 68.448944z m593.453514 763.892373a34.224972 34.224972 0 0 1-34.224972-34.224972v-93.089923a34.224972 34.224972 0 1 1 68.449944 0v93.089923a34.224972 34.224972 0 0 1-34.224972 34.224972zM905.239257 1023.99816a34.224972 34.224972 0 0 1-17.111986-63.999947l80.427934-46.544962a34.224972 34.224972 0 1 1 34.223972 59.207951l-80.427934 46.545962a34.224972 34.224972 0 0 1-17.111986 4.790996z m-167.699862 0a34.224972 34.224972 0 0 1-17.112986-4.448996L639.999475 972.661202a34.224972 34.224972 0 1 1 34.223972-59.207951l80.427934 46.544962a34.224972 34.224972 0 0 1-17.111986 63.999947zM573.26153 832.341317a34.224972 34.224972 0 0 1-34.224972-34.224972v-93.089923a34.224972 34.224972 0 0 1 68.449944 0v93.089923a34.224972 34.224972 0 0 1-34.224972 34.224972z m83.849931-238.202804a34.224972 34.224972 0 0 1-17.111986-63.999948l80.426934-46.545962a34.224972 34.224972 0 1 1 34.224972 59.208952l-80.427934 46.886961a34.224972 34.224972 0 0 1-17.111986 4.449997z m328.55573 0a34.224972 34.224972 0 0 1-17.111986-4.449997l-80.427934-46.544962a34.224972 34.224972 0 0 1 34.223972-59.207951l80.427934 46.544962a34.224972 34.224972 0 0 1-17.111986 63.999947z"  /><path fill="#333333" d="M904.897258 1023.99916a34.224972 34.224972 0 0 1-30.801975-19.165984 58.865952 58.865952 0 0 0-105.753913 0 34.224972 34.224972 0 0 1-61.26195-30.117976 127.314896 127.314896 0 0 1 228.619812 0 34.224972 34.224972 0 0 1-30.801974 49.28296zM821.389326 599.613508a126.629896 126.629896 0 0 1-114.309906-71.187941 34.224972 34.224972 0 0 1 61.603949-30.116976 58.865952 58.865952 0 0 0 105.753914 0 34.224972 34.224972 0 1 1 61.603949 30.116976 126.288896 126.288896 0 0 1-114.651906 71.187941z m241.624802 139.635886a127.314896 127.314896 0 0 1-104.726914-198.159838 34.224972 34.224972 0 1 1 56.812953 38.330969 58.865952 58.865952 0 0 0 51.336958 91.721924 34.224972 34.224972 0 1 1 2.737998 68.449944zM656.769461 977.109198a34.224972 34.224972 0 0 1-28.406976-53.046956 58.865952 58.865952 0 0 0-52.705957-91.379925 34.224972 34.224972 0 0 1-4.448997-68.449944 127.314896 127.314896 0 0 1 113.283908 197.818838 34.224972 34.224972 0 0 1-27.721978 15.058987z m-77.005937-237.859804h-8.897992a34.224972 34.224972 0 0 1 4.449996-68.449944 58.865952 58.865952 0 0 0 52.704957-91.378925 34.224972 34.224972 0 1 1 56.469954-38.330969A127.314896 127.314896 0 0 1 579.079525 739.249394zM986.009191 977.109198a34.224972 34.224972 0 0 1-28.405977-15.057987 127.314896 127.314896 0 0 1 114.309907-197.817838 34.224972 34.224972 0 0 1 31.828974 36.27797 34.224972 34.224972 0 0 1-36.277971 31.828974 58.865952 58.865952 0 0 0-53.048956 91.721925 34.224972 34.224972 0 0 1-28.405977 53.389956zM821.389326 863.144292A111.571908 111.571908 0 1 1 932.961235 752.939382 111.913908 111.913908 0 0 1 821.389326 863.143292z m0-155.037873a43.122965 43.122965 0 1 0 43.122965 44.834963 43.464964 43.464964 0 0 0-43.122965-44.834963z"  /></svg>
    ),
    'suppliersManage': () => (
        <svg width="1em" height="1em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M32.064 848a32 32 0 0 0 64 0c0-131.008 98.816-237.824 225.792-252.928l27.072 54.4-28.8 231.04H384l-28.8-231.04 26.944-54.08c26.304 3.264 51.776 9.216 75.072 19.776 4.992-21.312 12.096-41.664 21.12-61.056A320 320 0 0 0 32.064 848zM352.064 80a192 192 0 1 0 0 384 192 192 0 0 0 0-384z m0 320.192a128.192 128.192 0 1 1 0-256.448 128.192 128.192 0 0 1 0 256.448zM851.456 839.104c2.56 3.904 6.976 9.152 13.376 15.552 35.392 38.784 60.032 68.544 73.984 89.344l53.12-40.832a70577.92 70577.92 0 0 1-94.848-97.088l-45.632 33.024zM629.376 495.552c-22.72 84.16-51.264 153.344-85.376 207.68 10.112 38.784 16.384 65.984 18.944 81.472 11.392-18.048 22.784-36.864 34.176-56.256v211.648h56.96V610.048c11.392-31.04 22.144-63.36 32.256-97.088l-56.96-17.408zM929.344 738.176V639.168h51.264v-58.24h-51.264V497.472h-60.736v83.456h-70.272V497.472h-60.736v83.456h-49.344v58.24h49.344v41.408c-0.64 2.368-1.472 4.736-1.472 7.36s0.896 4.992 1.472 7.36v42.816h-64.512v60.16h318.848v-60.16h-62.592z m-60.8 0h-70.272v-41.536c0.832-2.752 1.728-5.568 1.728-8.64s-0.96-5.888-1.728-8.64v-40.192h70.272v99.008zM674.944 903.168c17.728 15.552 32.896 29.12 45.568 40.832a1119.808 1119.808 0 0 0 91.136-104.896l-51.264-34.944a618.752 618.752 0 0 1-85.44 99.008z"  /></svg>
    )
};

export default SVG_ICONS;
