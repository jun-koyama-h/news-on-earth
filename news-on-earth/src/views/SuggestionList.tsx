import React from 'react';
import styles from './SuggestionList.module.css';

interface SuggestionListProps {
	suggestions: string[];
	handleSuggestionClick: (suggestion: string) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, handleSuggestionClick }) => {
	if (suggestions.length === 0) {
			return null; // サジェストがない場合は何も表示しない
	}

	return (
		<ul className={styles.suggestionsList}>
			{suggestions.map((suggestion, index) => (
				<li key={index} onClick={() => handleSuggestionClick(suggestion)}>
					{suggestion}
				</li>
			))}
		</ul>
	);
};

export default SuggestionList;