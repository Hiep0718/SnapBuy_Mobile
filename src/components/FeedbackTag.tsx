import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FeedbackTagProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

const FeedbackTag: React.FC<FeedbackTagProps> = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.tag, selected && styles.selected]}
            onPress={onPress}
        >
            <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tag: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 4,
        backgroundColor: '#f8f8f8',
    },
    selected: {
        backgroundColor: '#b2f0f2',
        borderColor: '#00c3c8',
    },
    text: {
        color: '#555',
    },
    textSelected: {
        color: '#007d80',
        fontWeight: '600',
    },
});

export default FeedbackTag;
