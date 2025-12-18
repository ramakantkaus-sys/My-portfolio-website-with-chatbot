import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export const RamakantChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello. I'm Ramakant's AI assistant. How can I help you regarding his professional background?",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestedPrompts = [
        "Experience",
        "Projects",
        "Skills"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (text: string = inputValue) => {
        if (!text.trim() || isLoading) return;

        const userMsg = text.trim();
        setInputValue("");

        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch("/.netlify/functions/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply }
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Connection error. Please try again." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
            {isOpen && (
                <Card className="w-[380px] sm:w-[400px] h-[600px] flex flex-col shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5 fade-in duration-300 rounded-xl overflow-hidden glass">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border/40 bg-background/80 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm tracking-wide">Ramakant AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Online</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors hidden sm:flex"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        {/* Mobile close button visible only on small screens if needed, but 'sm:flex' hides it on mobile usually. Adjusted for consistent UX */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors sm:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4 bg-background/40">
                        <div className="flex flex-col gap-6">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex gap-3 max-w-[90%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-1",
                                            msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-primary" />}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider ml-1">
                                            {msg.role === "user" ? "You" : "AI Assistant"}
                                        </span>
                                        <div
                                            className={cn(
                                                "p-3 rounded-xl text-sm leading-relaxed shadow-sm",
                                                msg.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-background border border-border/50 text-foreground rounded-tl-none"
                                            )}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3 max-w-[90%] mr-auto">
                                    <div className="w-8 h-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-background border border-border/50 p-3 rounded-xl rounded-tl-none flex items-center gap-1 shadow-sm h-10">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border/40 bg-background/60 backdrop-blur-md">

                        {/* Suggested Prompts */}
                        {messages.length < 3 && (
                            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                                {suggestedPrompts.map(prompt => (
                                    <button
                                        key={prompt}
                                        onClick={() => handleSendMessage(`Tell me about Ramakant's ${prompt}`)}
                                        className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-foreground rounded-full border border-primary/20 transition-colors whitespace-nowrap"
                                    >
                                        Ask about {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2 relative">
                            <Input
                                placeholder="Ask a professional question..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-background/50 focus-visible:ring-primary/20 pr-10"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isLoading}
                                size="icon"
                                className="shrink-0 absolute right-1 top-1 h-8 w-8"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-2 text-[10px] text-center text-muted-foreground/60">
                            AI generated responses. Verify important details.
                        </div>
                    </div>
                </Card>
            )}

            {/* Floating Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-200 bg-gradient-primary"
                    size="icon"
                >
                    <MessageCircle className="w-7 h-7" />
                    <span className="sr-only">Open Chat</span>
                </Button>
            )}
        </div>
    );
};
