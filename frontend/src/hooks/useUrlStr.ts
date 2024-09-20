// import { ROUTES } from "@/constants/const";
// //import { useLangData } from "@/features/multi-language/providers/LangProvider";
// import { helper } from "@/utils/helper";
// import { useMemo } from "react";
// import { useLocation } from "react-router";
// import { useSearchParams } from "react-router-dom";

// export function useUrlStr() {
//   const [
//     searchParams, 
//     //setSearchParams
//   ] = useSearchParams();
//   const {
//     cats,
//     loadTranslations,
//   } = useLangData();
//   const location = useLocation();
//   const parts = location.pathname.split('/');

//   let category = searchParams.get('cat') || 'trade';
//   let currentPage = parts[1];
//   // if (parts.length > 2) {
//   //   category = parts[1];
//   //   currentPage = parts[2]
//   //     ? helper.removeWhiteSpaceAndSpecialChars(parts[2]).toLowerCase()
//   //     : '';
//   // }
//   // else {
//   //   currentPage = parts[1]
//   //   ? helper.removeWhiteSpaceAndSpecialChars(parts[1]).toLowerCase()
//   //   : '';
//   // }

//   const pathname:string = location.pathname;

//   const stack = searchParams.get('his');
//   const section = searchParams.get('sec');
//   // string , name of previous parent pages.
//   const hisStack = stack?.split('-').filter((word:string) => word.length > 0);

//   const history = useMemo(() => {
//     if (!hisStack?.length) return [];

//     return hisStack.map((pageName:string,) => {
//       //console.log('----------hh', ROUTES[pageName].link1)
//       const navObj = {
//         id: helper.getRandomId(),
//         uiName: !loadTranslations ? cats[category]?.subs[pageName] || pageName : pageName,
//         name: pageName,
//         // @ts-ignore
//         href: ROUTES[pageName]?.link1
//       };
//       return navObj;
//     }) 
//   }, [hisStack, cats]);

//   return {
//     category,
//     currentPage,
//     history,
//     hisStack,
//     location,
//     pathname,
//     section: section ?? '',
//   }
// }