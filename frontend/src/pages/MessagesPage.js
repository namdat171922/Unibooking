import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { MessageCircle, Send, Search } from 'lucide-react';

const MessagesPage = () => {
  const { user } = useAuth();
  const [conversations] = useState([
    {
      id: 1,
      businessName: 'Modern Hair Salon',
      lastMessage: 'Your appointment is confirmed for tomorrow at 10 AM',
      timestamp: '5 min ago',
      unread: 2,
      avatar: '💇',
    },
    {
      id: 2,
      businessName: 'Premium Spa Center',
      lastMessage: 'Thank you for your review! We appreciate it.',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: '🧖',
    },
    {
      id: 3,
      businessName: 'Elite Barbershop',
      lastMessage: 'New promotion: 20% off all services this week!',
      timestamp: '3 hours ago',
      unread: 0,
      avatar: '💈',
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Messages
          </h1>
          <p className="text-text-secondary">Communicate with businesses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1 card p-4 h-[600px] overflow-y-auto">
            {/* Search */}
            <div className="mb-4 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
              />
            </div>

            {/* Conversation Items */}
            <div className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedConversation?.id === conv.id
                      ? 'bg-primary bg-opacity-10 border border-primary'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{conv.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold text-sm truncate">{conv.businessName}</p>
                        {conv.unread > 0 && (
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 card p-6 h-[600px] flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="font-bold text-lg">{selectedConversation.businessName}</h2>
                  <p className="text-sm text-text-secondary">Active now</p>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Your appointment is confirmed for tomorrow at 10 AM</p>
                      <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Great! Thank you for the reminder.</p>
                      <p className="text-xs text-primary/80 mt-1">2:35 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">See you tomorrow! Don't forget to arrive 10 minutes early.</p>
                      <p className="text-xs text-gray-500 mt-1">2:40 PM</p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
                  />
                  <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-text-secondary">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
