import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { PlaceTimeSelector } from '../components/PlaceTimeSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Mic, MessageCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import placesData from '../data/places.json';
import eventsData from '../data/events.json';
import { useAuth } from '../hooks/useAuth';

export default function Chatbot() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your Kenya travel assistant. I can help you discover amazing places, find events, and plan your perfect Kenyan adventure. What interests you most?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const message = userMessage.toLowerCase();
    let response = '';
    let recommendations: any[] = [];

    // Check if this is a place/time selection
    if (message.includes('visiting') && message.includes('during')) {
      const parts = userMessage.split(' - ');
      if (parts.length === 2) {
        const place = parts[0].replace('I want to visit ', '');
        const timeframe = parts[1];
        
        response = `Excellent choice! For ${place} ${timeframe}, here are my personalized recommendations:`;
        
        // Filter recommendations based on the selected place
        if (place.toLowerCase().includes('mara')) {
          recommendations = placesData.filter(p => p.id === 'masai-mara' || p.category === 'Safari').slice(0, 2);
          recommendations.push(...eventsData.filter(e => e.vibes.some(v => v.includes('Wildlife'))).slice(0, 1));
        } else if (place.toLowerCase().includes('cultural') || place.toLowerCase().includes('maasai')) {
          recommendations = placesData.filter(p => p.category === 'Cultural').slice(0, 2);
          recommendations.push(...eventsData.filter(e => e.vibes.some(v => v.includes('Cultural'))).slice(0, 1));
        } else if (place.toLowerCase().includes('beach') || place.toLowerCase().includes('diani')) {
          recommendations = placesData.filter(p => p.vibes.some(v => v.includes('Beach'))).slice(0, 2);
          recommendations.push(...eventsData.filter(e => e.location.includes('Coast')).slice(0, 1));
        } else if (place.toLowerCase().includes('nakuru')) {
          recommendations = placesData.filter(p => p.location.includes('Nakuru') || p.vibes.some(v => v.includes('Wildlife'))).slice(0, 2);
          recommendations.push(...eventsData.filter(e => e.location.includes('Nakuru')).slice(0, 1));
        } else {
          // General recommendations
          recommendations = [...placesData.slice(0, 2), ...eventsData.slice(0, 1)];
        }
        
        if (timeframe.includes('weekend') || timeframe.includes('week')) {
          response += ` Perfect for a ${timeframe.includes('weekend') ? 'weekend getaway' : 'week-long adventure'}!`;
        } else if (timeframe.includes('dry season')) {
          response += ` The dry season is ideal for wildlife viewing and outdoor activities!`;
        }
        
        return {
          id: Date.now().toString(),
          content: response,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          type: 'recommendations',
          data: recommendations
        };
      }
    }

    if (message.includes('wildlife') || message.includes('animals') || message.includes('safari')) {
      response = "Perfect! Based on your interest in wildlife and nature, I recommend these amazing safari destinations:";
      recommendations = placesData.filter(place => 
        place.vibes.some(vibe => vibe.includes('Wildlife') || vibe.includes('Nature'))
      ).slice(0, 3);
    } else if (message.includes('beach') || message.includes('coast') || message.includes('ocean')) {
      response = "Great choice! Kenya has beautiful coastal areas. Here are some stunning beach destinations:";
      recommendations = placesData.filter(place => 
        place.vibes.some(vibe => vibe.includes('Beach'))
      );
    } else if (message.includes('culture') || message.includes('traditional') || message.includes('heritage')) {
      response = "Wonderful! Kenya has a rich cultural heritage. Here are some cultural experiences:";
      recommendations = [...placesData.filter(place => place.category === 'Cultural'),
                         ...eventsData.filter(event => event.vibes.some(vibe => vibe.includes('Cultural')))];
    } else if (message.includes('event') || message.includes('festival') || message.includes('activity')) {
      response = "Here are some exciting events happening in Kenya:";
      recommendations = eventsData.slice(0, 3);
    } else if (message.includes('budget') || message.includes('cheap') || message.includes('affordable')) {
      response = "I can help you find budget-friendly options! What's your daily budget range?";
    } else if (message.includes('book') || message.includes('reserve')) {
      response = "I can help you book tours and accommodations! Which place or event would you like to book?";
    } else {
      response = "I'd be happy to help you explore Kenya! You can ask me about wildlife safaris, beaches, cultural experiences, events, or specific places you'd like to visit. What interests you most?";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      type: recommendations.length > 0 ? 'recommendations' : 'text',
      data: recommendations
    };
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const simulateVoiceInput = () => {
    // Simulate voice input
    const voiceInputs = [
      "I want to visit places with wildlife",
      "Show me cultural events",
      "What beaches do you recommend?",
      "I'm interested in safari tours"
    ];
    const randomInput = voiceInputs[Math.floor(Math.random() * voiceInputs.length)];
    setInputValue(randomInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handlePlaceTimeSelection = (place: string, timeframe: string) => {
    const selectionMessage = `I want to visit ${place} - ${timeframe}`;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: selectionMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(selectionMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <div className="flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-kenyan-green to-kenyan-orange px-4 py-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Kenya Travel Assistant</h3>
              <p className="text-sm text-white/80">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Place/Time Selector - Only for travelers */}
        {user?.role === 'traveler' && (
          <div className="px-4 pt-2 bg-gray-50">
            <PlaceTimeSelector onSelectionSend={handlePlaceTimeSelection} />
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : ''
            }`}>
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-kenyan-green rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-kenyan-green text-white rounded-2xl rounded-tr-md p-3' 
                  : 'bg-white rounded-2xl rounded-tl-md p-3 shadow-sm'
              }`}>
                <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                  {message.content}
                </p>
                
                {message.type === 'recommendations' && message.data && (
                  <div className="mt-3 space-y-2">
                    {message.data.map((item: any, index: number) => (
                      <Card key={index} className="bg-gray-50">
                        <CardContent className="p-2">
                          <p className="font-medium text-sm">{item.name || item.title}</p>
                          <p className="text-xs text-gray-600 mb-1">
                            {item.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.vibes?.slice(0, 2).map((vibe: string) => (
                              <Badge key={vibe} variant="outline" className="text-xs">
                                {vibe}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-sm">👤</span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-kenyan-green rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-kenyan-green focus:bg-white border-0 pr-12"
              />
              <Button
                onClick={simulateVoiceInput}
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-kenyan-green"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={sendMessage}
              className="bg-kenyan-green hover:bg-kenyan-green/90 text-white p-3 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
