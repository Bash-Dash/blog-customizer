import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(currentState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	const toggleSidebar = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);

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

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				handleClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className={styles.wrapper} ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleApply}>
					<div className={styles.formContent}>
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleSelectChange('fontFamilyOption')}
						/>

						<Separator />

						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleSelectChange('fontSizeOption')}
						/>

						<Separator />

						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleSelectChange('fontColor')}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleSelectChange('backgroundColor')}
						/>

						<Separator />

						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleSelectChange('contentWidth')}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
