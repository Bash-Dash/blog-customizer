import { CSSProperties, useState } from "react";
import { Article } from "../components/article/Article";
import { ArticleParamsForm } from "../components/article-params-form/ArticleParamsForm";
import { defaultArticleState } from "../constants/articleProps";

import styles from "./App.module.scss";

export const App = () => {
  const [articleState, setArticleState] = useState(defaultArticleState);

  return (
    <main
      className={styles.app}
      style={
        {
          "--font-family": articleState.fontFamilyOption.value,
          "--font-size": articleState.fontSizeOption.value,
          "--font-color": articleState.fontColor.value,
          "--container-width": articleState.contentWidth.value,
          "--bg-color": articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        currentState={articleState}
        onApply={setArticleState}
      />
      <Article />
    </main>
  );
};
