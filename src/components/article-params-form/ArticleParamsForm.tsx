import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ArrowButton } from "src/ui/arrow-button";
import { Button } from "src/ui/button";
import { Select } from "src/ui/select";
import { RadioGroup } from "src/ui/radio-group";
import { Separator } from "src/ui/separator";
import { Text } from "src/ui/text";
import { useClose } from "../../hooks/useClose";
import {
  defaultArticleState,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  ArticleStateType,
  OptionType,
} from "src/constants/articleProps";

import styles from "./ArticleParamsForm.module.scss";

type ArticleParamsFormProps = {
  currentState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  currentState,
  onApply,
}: ArticleParamsFormProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState(currentState);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormState(currentState);
  }, [currentState]);

  const toggleSidebar = () => setIsMenuOpen(!isMenuOpen);
  const handleClose = () => setIsMenuOpen(false);

  useClose({
    isOpen: isMenuOpen,
    onClose: toggleSidebar,
    rootRef: formRef,
  });

  const handleSelectChange =
    (field: keyof ArticleStateType) => (option: OptionType) => {
      setFormState((prev) => ({
        ...prev,
        [field]: option,
      }));
    };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formState);
    handleClose();
  };

  const handleReset = () => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div className={styles.wrapper} ref={formRef}>
      <ArrowButton isOpen={isMenuOpen} onClick={toggleSidebar} />

      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isMenuOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply}>
          <div className={styles.formContent}>
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>

            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={handleSelectChange("fontFamilyOption")}
            />

            <RadioGroup
              title="Размер шрифта"
              name="fontSize"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={handleSelectChange("fontSizeOption")}
            />

            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={handleSelectChange("fontColor")}
            />

            <Separator />

            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={handleSelectChange("backgroundColor")}
            />

            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={handleSelectChange("contentWidth")}
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="clear" onClick={handleReset} />
            <Button title="Применить" type="apply" htmlType="submit" />
          </div>
        </form>
      </aside>
    </div>
  );
};
