import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Users, 
  MapPin, 
  Calendar,
  MessageSquare,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [stats] = useState({
    pendingReviews: 12,
    newSubmissions: 8,
    activeUsers: 1247,
    totalPosts: 3891
  });

  const [pendingSubmissions] = useState([
    {
      id: 1,
      type: 'place',
      name: 'Samburu National Reserve',
      submittedBy: 'Wildlife Lodge Kenya',
      status: 'pending',
      date: '2 hours ago'
    },
    {
      id: 2,
      type: 'event',
      name: 'Nairobi Jazz Festival',
      submittedBy: 'Cultural Events Ltd',
      status: 'pending',
      date: '4 hours ago'
    },
    {
      id: 3,
      type: 'place',
      name: 'Hell\'s Gate National Park',
      submittedBy: 'Adventure Tours',
      status: 'pending',
      date: '1 day ago'
    }
  ]);

  const [userFeedback] = useState([
    {
      id: 1,
      venue: 'Masai Mara Safari Lodge',
      rating: 5,
      comment: 'Amazing experience! The staff was very helpful and the wildlife viewing was incredible.',
      user: 'Adventure Explorer',
      date: '2 hours ago',
      status: 'new'
    },
    {
      id: 2,
      venue: 'Diani Beach Resort',
      rating: 4,
      comment: 'Beautiful location and great facilities. The beach was pristine.',
      user: 'Beach Lover',
      date: '5 hours ago',
      status: 'forwarded'
    },
    {
      id: 3,
      venue: 'Lamu Cultural Festival',
      rating: 5,
      comment: 'Incredible cultural experience. Learned so much about Swahili heritage.',
      user: 'Culture Enthusiast',
      date: '1 day ago',
      status: 'new'
    }
  ]);

  const [communityPosts] = useState([
    {
      id: 1,
      author: 'Adventure Explorer',
      content: 'Just witnessed the most incredible sunset at Diani Beach!',
      reports: 0,
      status: 'approved'
    },
    {
      id: 2,
      author: 'Wildlife Photographer',
      content: 'Amazing leopard sighting in Masai Mara today!',
      reports: 1,
      status: 'flagged'
    }
  ]);

  const handleApproveSubmission = (id: number) => {
    toast({
      title: "Submission Approved",
      description: "The submission has been approved and is now live."
    });
  };

  const handleRejectSubmission = (id: number) => {
    toast({
      title: "Submission Rejected",
      description: "The submission has been rejected and the submitter has been notified."
    });
  };

  const handleForwardFeedback = (id: number, venue: string) => {
    toast({
      title: "Feedback Forwarded",
      description: `Feedback has been sent to ${venue}.`
    });
  };

  const handleModeratePost = (id: number, action: 'approve' | 'remove') => {
    toast({
      title: action === 'approve' ? "Post Approved" : "Post Removed",
      description: `The community post has been ${action}d.`
    });
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="page-content">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Admin</span>
              <div className="w-8 h-8 bg-kenyan-red rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-4">
                <p className="text-sm opacity-80">Pending Reviews</p>
                <p className="text-2xl font-bold">{stats.pendingReviews}</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-500 text-white">
              <CardContent className="p-4">
                <p className="text-sm opacity-80">New Submissions</p>
                <p className="text-2xl font-bold">{stats.newSubmissions}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-500 text-white">
              <CardContent className="p-4">
                <p className="text-sm opacity-80">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 text-white">
              <CardContent className="p-4">
                <p className="text-sm opacity-80">Total Posts</p>
                <p className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="submissions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
            </TabsList>

            {/* Content Submissions */}
            <TabsContent value="submissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Pending Submissions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingSubmissions.map((submission) => (
                    <div key={submission.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {submission.type === 'place' ? (
                            <MapPin className="h-4 w-4 text-kenyan-green" />
                          ) : (
                            <Calendar className="h-4 w-4 text-kenyan-orange" />
                          )}
                          <span className="font-medium text-sm">{submission.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{submission.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        Submitted by: {submission.submittedBy}
                      </p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveSubmission(submission.id)}
                          className="bg-green-500 hover:bg-green-600 text-white flex-1"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectSubmission(submission.id)}
                          className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Feedback */}
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>User Feedback</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{feedback.venue}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < feedback.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">"{feedback.comment}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          From: {feedback.user} • {feedback.date}
                        </span>
                        <div className="flex items-center space-x-2">
                          {feedback.status === 'new' && (
                            <Badge variant="default">New</Badge>
                          )}
                          {feedback.status === 'forwarded' && (
                            <Badge variant="secondary">Forwarded</Badge>
                          )}
                          {feedback.status === 'new' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleForwardFeedback(feedback.id, feedback.venue)}
                              className="bg-kenyan-green hover:bg-kenyan-green/90 text-white text-xs"
                            >
                              Forward to Venue
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Moderation */}
            <TabsContent value="moderation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Community Moderation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{post.author}</span>
                        <div className="flex items-center space-x-2">
                          {post.reports > 0 && (
                            <Badge variant="destructive">{post.reports} reports</Badge>
                          )}
                          {post.status === 'approved' && (
                            <Badge variant="secondary">Approved</Badge>
                          )}
                          {post.status === 'flagged' && (
                            <Badge variant="destructive">Flagged</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">"{post.content}"</p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleModeratePost(post.id, 'approve')}
                          className="bg-green-500 hover:bg-green-600 text-white flex-1"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleModeratePost(post.id, 'remove')}
                          className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}
