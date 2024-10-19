import { Facebook, Twitter, Linkedin, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface SharePopupProps {
    onClose: () => void
}

export default function SharePopup({ onClose }: SharePopupProps) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    const shareOptions = [
        { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
        { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?url=${shareUrl}` },
        { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}` },
    ]

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl)
        // You might want to show a toast notification here
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share this post</DialogTitle>
                    <DialogDescription>Choose a platform to share this post or copy the link</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                    {shareOptions.map((option) => (
                        <Button key={option.name} variant="outline" onClick={() => window.open(option.url, '_blank')}>
                            <option.icon className="mr-2 h-4 w-4" />
                            {option.name}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <Button onClick={copyToClipboard}>
                        <Link className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}