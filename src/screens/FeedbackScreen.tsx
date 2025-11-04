import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    Button,
} from 'react-native';
import FeedbackTag from '../components/FeedbackTag';
import { RatingStars } from '../components/RatingStars';
import * as ImagePicker from 'expo-image-picker';

const feedbackOptions = ['Service', 'Quantity', 'Payment', 'Delivery', 'Promotion', 'Gift'];

const FeedbackScreen: React.FC = () => {
    const [mood, setMood] = useState<'sad' | 'neutral' | 'happy' | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [feedback, setFeedback] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [rating, setRating] = useState(4);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });
        if (!result.canceled && result.assets.length > 0) {
            setImages(prev => [...prev, result.assets[0].uri]);
        }
    };

    const removeImage = (uri: string) => {
        setImages(prev => prev.filter(img => img !== uri));
    };

    const handleSubmit = () => {
        const data = { mood, selectedTags, feedback, images, rating };
        console.log('Feedback submitted:', data);
        alert('Feedback submitted successfully!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback</Text>

            {/* Mood Section */}
            <View style={styles.moodRow}>
                {['sad', 'neutral', 'happy'].map((m) => (
                    <TouchableOpacity key={m} onPress={() => setMood(m as any)}>
                        <Text style={[styles.mood, mood === m && styles.moodSelected]}>
                            {m === 'sad' ? '😞' : m === 'neutral' ? '😐' : '😊'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
                {feedbackOptions.map((tag) => (
                    <FeedbackTag
                        key={tag}
                        label={tag}
                        selected={selectedTags.includes(tag)}
                        onPress={() => toggleTag(tag)}
                    />
                ))}
            </View>

            {/* Text input */}
            <TextInput
                style={styles.textInput}
                placeholder="Care to share more?"
                value={feedback}
                onChangeText={setFeedback}
                multiline
            />

            {/* Images */}
            <Text style={styles.sectionTitle}>Upload images</Text>
            <FlatList
                horizontal
                data={[...images, 'add']}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    item === 'add' ? (
                        <TouchableOpacity style={styles.addBox} onPress={pickImage}>
                            <Text style={styles.plus}>＋</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item }} style={styles.image} />
                            <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(item)}>
                                <Text style={{ color: 'white', fontSize: 12 }}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            />

            {/* Rating */}
            <Text style={styles.sectionTitle}>Rating</Text>
            <RatingStars rating={rating} setRating={setRating} />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    mood: {
        fontSize: 32,
        marginHorizontal: 10,
        opacity: 0.4,
    },
    moodSelected: {
        opacity: 1,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        height: 80,
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    sectionTitle: {
        fontWeight: '600',
        marginVertical: 6,
    },
    addBox: {
        width: 70,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    plus: {
        fontSize: 28,
        color: '#555',
    },
    imageContainer: {
        position: 'relative',
        marginRight: 8,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    removeBtn: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 4,
    },
    submitBtn: {
        backgroundColor: '#00c3c8',
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 12,
    },
    submitText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
    },
});
