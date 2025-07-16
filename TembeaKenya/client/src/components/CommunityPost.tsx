import { useState } from 'react';
import { CommunityPost as CommunityPostType } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Eye, Coins, MoreHorizontal } from 'lucide-react';

interface CommunityPostProps {
  post: CommunityPostType;
}

export function CommunityPost({ post }: CommunityPostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Post Header */}
      <CardContent className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-kenyan-green to-kenyan-orange rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.author.initials}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </CardContent>

      {/* Post Content */}
      <CardContent className="px-4 pb-2">
        <p className="text-gray-800 text-sm mb-3">{post.caption}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Post Image */}
      <img 
        src={post.imageUrl} 
        alt="Post content" 
        className="w-full h-64 object-cover"
      />

      {/* Post Actions */}
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                liked ? 'text-kenyan-red' : 'text-gray-600 hover:text-kenyan-red'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm">{post.views}</span>
            </Button>
          </div>
          <div className="flex items-center space-x-1 text-kenyan-green">
            <Coins className="h-4 w-4" />
            <span className="text-sm font-semibold">{post.credits}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
