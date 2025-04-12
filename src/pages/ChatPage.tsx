
import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

const ChatPage = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Chat List Sidebar */}
      <div className="w-72 border-l border-gray-800 bg-chatqr-darker overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3">الدردشات</h2>
          
          {mockChats.map((chat, index) => (
            <div 
              key={index}
              className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${index === 0 ? 'bg-chatqr-card' : 'hover:bg-gray-800'}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div className="mr-3 overflow-hidden">
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  <span className="text-gray-400 text-xs">{chat.time}</span>
                </div>
                <p className="text-gray-400 text-sm truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="mr-3">
              <h3 className="font-medium">مجموعة المطورين</h3>
              <p className="text-gray-400 text-xs">32 عضو، 5 متصلين</p>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message, index) => (
            <div key={index} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${message.isMe ? 'bg-neon text-black' : 'bg-chatqr-card'}`}>
                {!message.isMe && (
                  <div className="font-medium text-sm mb-1">{message.sender}</div>
                )}
                <p className={`text-sm ${message.isMe ? 'text-black' : 'text-white'}`}>{message.text}</p>
                <div className={`text-xs text-right mt-1 ${message.isMe ? 'text-gray-800' : 'text-gray-400'}`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="h-16 border-t border-gray-800 p-2 flex items-center">
          <button className="p-2 text-gray-400 hover:text-white">
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            className="flex-1 bg-gray-800 border-0 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon mx-2 text-white"
            placeholder="اكتب رسالة..."
          />
          <button className="p-2 text-gray-400 hover:text-white">
            <Smile size={20} />
          </button>
          <button className="p-2 text-neon hover:text-white">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockChats = [
  { name: "مجموعة المطورين", lastMessage: "أحمد: هل يمكنك مساعدتي في هذه المشكلة؟", time: "10:42" },
  { name: "سارة أحمد", lastMessage: "شكراً للمساعدة!", time: "أمس" },
  { name: "فريق التصميم", lastMessage: "محمد: سأرسل لكم النماذج غداً", time: "أمس" },
  { name: "خالد محمد", lastMessage: "متى موعد الاجتماع القادم؟", time: "الأحد" },
  { name: "مجموعة التسويق", lastMessage: "فاطمة: تم الانتهاء من الحملة", time: "السبت" },
  { name: "عمر علي", lastMessage: "أراك غداً في المكتب", time: "23/3" },
];

const mockMessages = [
  { sender: "أحمد", text: "مرحباً بالجميع في المجموعة الجديدة!", time: "10:30", isMe: false },
  { sender: "سارة", text: "أهلاً أحمد، سعيدة بالانضمام!", time: "10:32", isMe: false },
  { sender: "محمد", text: "متى سيبدأ اجتماعنا القادم؟", time: "10:35", isMe: false },
  { text: "سنجتمع غداً في الساعة 3 مساءً", time: "10:36", isMe: true },
  { sender: "أحمد", text: "هل يمكنك مساعدتي في هذه المشكلة التي واجهتني أثناء تطوير الواجهة؟", time: "10:40", isMe: false },
  { text: "بالتأكيد، يمكنك مشاركة تفاصيل المشكلة وسأحاول مساعدتك", time: "10:42", isMe: true },
];

export default ChatPage;
