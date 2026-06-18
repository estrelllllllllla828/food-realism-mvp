import { Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import CommunityPage from './pages/CommunityPage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import CreatePostPage from './pages/CreatePostPage'
import DetailPage from './pages/DetailPage'
import CommunityPostPage from './pages/CommunityPostPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post/create" element={<CreatePostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/community/:postId" element={<CommunityPostPage />} />
      <Route path="/food/:foodId" element={<DetailPage />} />
    </Routes>
  )
}
