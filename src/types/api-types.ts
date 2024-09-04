
// export type webhooks = Record<string, never>;
// export interface components {
//     schemas: {
//         /** Boards */
//         "def-0": {
//             createBoard: {
//                 title: string;
//                 org_id: string;
//                 image_id: string;
//                 image_thumb_url: string;
//                 image_full_url: string;
//                 image_link_html: string;
//                 image_username: string;
//             };
//             fullBoardResponseSchema: {
//                 id: string;
//                 title: components["schemas"]["def-0"]["createBoard"]["title"];
//                 org_id: components["schemas"]["def-0"]["createBoard"]["org_id"];
//                 image_id: components["schemas"]["def-0"]["createBoard"]["image_id"];
//                 image_thumb_url: components["schemas"]["def-0"]["createBoard"]["image_thumb_url"];
//                 image_full_url: components["schemas"]["def-0"]["createBoard"]["image_full_url"];
//                 image_link_html: components["schemas"]["def-0"]["createBoard"]["image_link_html"];
//                 image_username: components["schemas"]["def-0"]["createBoard"]["image_username"];
//                 /** Format: date-time */
//                 created_at: string;
//                 /** Format: date-time */
//                 updated_at: string;
//             };
//             boardsResponseSchema: components["schemas"]["def-0"]["fullBoardResponseSchema"][];
//             deleteBoard: {
//                 id: components["schemas"]["def-0"]["fullBoardResponseSchema"]["id"];
//             };
//             deleteBoardResponse: {
//                 id: components["schemas"]["def-0"]["fullBoardResponseSchema"]["id"];
//                 title: string;
//             };
//             updateBoardTitle: {
//                 id: components["schemas"]["def-0"]["fullBoardResponseSchema"]["id"];
//                 title: components["schemas"]["def-0"]["createBoard"]["title"];
//             };
//         };
//         /** List */
//         "def-1": {
//             createList: {
//                 board_id: string;
//                 title: string;
//             };
//             updateListTitle: {
//                 id: string;
//                 board_id: components["schemas"]["def-1"]["createList"]["board_id"];
//                 title: components["schemas"]["def-1"]["createList"]["title"];
//             };
//             fullListResponseSchema: {
//                 board_id: components["schemas"]["def-1"]["createList"]["board_id"];
//                 title: components["schemas"]["def-1"]["createList"]["title"];
//                 order: number;
//                 id: components["schemas"]["def-1"]["updateListTitle"]["id"];
//                 /** Format: date-time */
//                 created_at: string;
//                 /** Format: date-time */
//                 updated_at: string;
//                 /** @default [] */
//                 cards: {
//                     id: string;
//                     title: string;
//                     description: null | string;
//                     order: number;
//                     list_id: string;
//                     /** Format: date-time */
//                     created_at: string;
//                     /** Format: date-time */
//                     updated_at: string;
//                 }[];
//             };
//             fullListsResponseSchema: components["schemas"]["def-1"]["fullListResponseSchema"][];
//             deleteList: {
//                 id: components["schemas"]["def-1"]["updateListTitle"]["id"];
//                 board_id: components["schemas"]["def-1"]["createList"]["board_id"];
//             };
//             deleteListResponse: {
//                 id: components["schemas"]["def-1"]["updateListTitle"]["id"];
//             };
//             copyList: {
//                 id: components["schemas"]["def-1"]["updateListTitle"]["id"];
//                 board_id: components["schemas"]["def-1"]["createList"]["board_id"];
//             };
//             updateListsOrder: {
//                 id: components["schemas"]["def-1"]["updateListTitle"]["id"];
//                 board_id: components["schemas"]["def-1"]["createList"]["board_id"];
//                 order: components["schemas"]["def-1"]["fullListResponseSchema"]["order"];
//             }[];
//         };
//         /** Card */
//         "def-2": {
//             createCard: {
//                 list_id: string;
//                 title: string;
//             };
//             fullCardResponseSchema: {
//                 id: string;
//                 list_id: components["schemas"]["def-2"]["createCard"]["list_id"];
//                 title: components["schemas"]["def-2"]["createCard"]["title"];
//                 order: number;
//                 /** Format: date-time */
//                 created_at: string;
//                 /** Format: date-time */
//                 updated_at: string;
//             };
//             updateCardOrder: {
//                 list_id: components["schemas"]["def-2"]["createCard"]["list_id"];
//                 id: components["schemas"]["def-2"]["fullCardResponseSchema"]["id"];
//                 order: components["schemas"]["def-2"]["fullCardResponseSchema"]["order"];
//             };
//             updateCardsOrder: components["schemas"]["def-2"]["updateCardOrder"][];
//         };
//     };
//     responses: never;
//     parameters: never;
//     requestBodies: never;
//     headers: never;
//     pathItems: never;
// }
// export type $defs = Record<string, never>;
// export type operations = Record<string, never>;





// type createTable = components.schemas["def"]


