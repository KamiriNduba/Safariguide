import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { CommunityPost } from '../components/CommunityPost';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Upload } from 'lucide-react';
import { CommunityPost as CommunityPostType } from '../types';
import { useToast } from '@/hooks/use-toast';
import communityPostsData from '../data/communityPosts.json';

export default function Community() {
  const [posts, setPosts] = useState<CommunityPostType[]>(communityPostsData);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    caption: '',
    tags: '',
    imageUrl: ''
  });
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPost.caption || !newPost.imageUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide a caption and image URL",
        variant: "destructive"
      });
      return;
    }

    const post: CommunityPostType = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Current User',
        initials: 'CU'
      },
      caption: newPost.caption,
      imageUrl: newPost.imageUrl,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      likes: 0,
      comments: 0,
      views: 1,
      credits: 0,
      timestamp: 'Just now'
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ caption: '', tags: '', imageUrl: '' });
    setShowCreatePost(false);
    
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!"
    });
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const placeholderImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'https://images.unsplash.com/photo-1564607827881-35fd764ecd9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
    ];
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    setNewPost(prev => ({ ...prev, imageUrl: randomImage }));
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Community</h2>
            <Button 
              onClick={() => setShowCreatePost(true)}
              className="bg-kenyan-green hover:bg-kenyan-green/90 text-white p-2 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-kenyan-green/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-kenyan-green">{posts.length}</p>
              <p className="text-xs text-gray-600">Posts</p>
            </div>
            <div className="bg-kenyan-orange/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-kenyan-orange">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
              <p className="text-xs text-gray-600">Total Likes</p>
            </div>
            <div className="bg-kenyan-red/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-kenyan-red">
                {posts.reduce((sum, post) => sum + post.credits, 0)}
              </p>
              <p className="text-xs text-gray-600">Credits</p>
            </div>
          </div>

          {/* Community Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      {/* Create Post Modal */}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Share your Kenya experience..."
                value={newPost.caption}
                onChange={(e) => setNewPost(prev => ({ ...prev, caption: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., #MasaiMara, #Wildlife, #Safari"
                value={newPost.tags}
                onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Image</Label>
              <div className="mt-1 space-y-2">
                <Input
                  placeholder="Image URL"
                  value={newPost.imageUrl}
                  onChange={(e) => setNewPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
                <Button 
                  onClick={handleImageUpload}
                  variant="outline" 
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image (Demo)
                </Button>
              </div>
            </div>

            {newPost.imageUrl && (
              <div className="mt-2">
                <img 
                  src={newPost.imageUrl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowCreatePost(false)}
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePost}
                className="flex-1 bg-kenyan-green hover:bg-kenyan-green/90 text-white"
              >
                Share Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
}
