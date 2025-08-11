import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { FaPaperPlane, FaUser } from 'react-icons/fa';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      provider: {
        id: 1,
        name: 'Rajesh Kumar',
        avatar: 'https://via.placeholder.com/40',
        service: 'Plumbing'
      },
      lastMessage: 'I\'ll be there at 2 PM tomorrow',
      timestamp: '2 hours ago',
      unread: 2
    },
    {
      id: 2,
      provider: {
        id: 2,
        name: 'Priya Sharma',
        avatar: 'https://via.placeholder.com/40',
        service: 'Cleaning'
      },
      lastMessage: 'Your booking has been confirmed',
      timestamp: '1 day ago',
      unread: 0
    },
    {
      id: 3,
      provider: {
        id: 3,
        name: 'Amit Patel',
        avatar: 'https://via.placeholder.com/40',
        service: 'Electrical'
      },
      lastMessage: 'What time would you prefer?',
      timestamp: '3 days ago',
      unread: 1
    }
  ];

  useEffect(() => {
    if (selectedConversation) {
      // Mock messages for selected conversation
      const conversationMessages = [
        {
          id: 1,
          sender: 'provider',
          message: 'Hello! I received your booking request for plumbing service.',
          timestamp: '10:30 AM',
          avatar: 'https://via.placeholder.com/32'
        },
        {
          id: 2,
          sender: 'user',
          message: 'Hi! Yes, I need help with a leaking faucet.',
          timestamp: '10:32 AM',
          avatar: 'https://via.placeholder.com/32'
        },
        {
          id: 3,
          sender: 'provider',
          message: 'I can help you with that. What time would be convenient for you?',
          timestamp: '10:35 AM',
          avatar: 'https://via.placeholder.com/32'
        },
        {
          id: 4,
          sender: 'user',
          message: 'Tomorrow afternoon would work for me.',
          timestamp: '10:37 AM',
          avatar: 'https://via.placeholder.com/32'
        },
        {
          id: 5,
          sender: 'provider',
          message: 'Perfect! I\'ll be there at 2 PM tomorrow.',
          timestamp: '10:40 AM',
          avatar: 'https://via.placeholder.com/32'
        }
      ];
      setMessages(conversationMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://via.placeholder.com/32'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card className="h-100">
                         <Card.Header className="bg-primary text-white">
               <h5 className="mb-0">Messages</h5>
             </Card.Header>
            <Card.Body className="p-0">
              <div className="conversation-list">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`conversation-item p-3 border-bottom ${
                      selectedConversation?.id === conversation.id ? 'bg-light' : ''
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={conversation.provider.avatar}
                        alt={conversation.provider.name}
                        className="rounded-circle me-3"
                        width="40"
                        height="40"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <h6 className="mb-1">{conversation.provider.name}</h6>
                          {conversation.unread > 0 && (
                            <Badge bg="primary" className="ms-2">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted small mb-1">{conversation.provider.service}</p>
                        <p className="text-muted small mb-0">{conversation.lastMessage}</p>
                        <small className="text-muted">{conversation.timestamp}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          {selectedConversation ? (
            <Card className="h-100">
              <Card.Header className="bg-light">
                <div className="d-flex align-items-center">
                  <img
                    src={selectedConversation.provider.avatar}
                    alt={selectedConversation.provider.name}
                    className="rounded-circle me-3"
                    width="40"
                    height="40"
                  />
                  <div>
                    <h6 className="mb-0">{selectedConversation.provider.name}</h6>
                    <small className="text-muted">{selectedConversation.provider.service}</small>
                  </div>
                </div>
              </Card.Header>
              
              <Card.Body className="d-flex flex-column" style={{ height: '400px' }}>
                <div className="flex-grow-1 overflow-auto mb-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`d-flex mb-3 ${
                        message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
                      }`}
                    >
                      <div
                        className={`d-flex align-items-end ${
                          message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <img
                          src={message.avatar}
                          alt="Avatar"
                          className="rounded-circle mx-2"
                          width="32"
                          height="32"
                        />
                        <div
                          className={`px-3 py-2 rounded ${
                            message.sender === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-light text-dark'
                          }`}
                          style={{ maxWidth: '70%' }}
                        >
                          <p className="mb-1">{message.message}</p>
                          <small className="opacity-75">{message.timestamp}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="d-flex">
                                     <Form.Control
                     as="textarea"
                     rows="2"
                     placeholder="Type your message..."
                     value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="me-2"
                  />
                  <Button
                    variant="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <FaPaperPlane />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="h-100 d-flex align-items-center justify-content-center">
              <Card.Body className="text-center">
                <FaUser size={48} className="text-muted mb-3" />
                <h5 className="text-muted">Select a conversation to start messaging</h5>
                <p className="text-muted">Choose a provider from the list to view your conversation</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MessagesPage; 