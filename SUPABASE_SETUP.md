# 🚀 Supabase Integration Setup Guide

## 📋 **Prerequisites**
- Supabase account (free tier works great)
- Your project already has the environment variables set up

## 🔧 **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `aestheticsales-coaching`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 🗄️ **Step 2: Set Up Database Schema**

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `database-schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

This will create:
- `assessment_submissions` table
- `coaching_results` table
- Proper indexes for performance
- Row Level Security (RLS) policies
- Sample data for testing

## 🔑 **Step 3: Get Your Project Credentials**

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (ends with `.supabase.co`)
   - **anon public** key

3. Update your `.env` file:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🧪 **Step 4: Test the Integration**

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the coaching demo page
3. Fill out the assessment form
4. Submit the form - it should now save to Supabase
5. Check your Supabase dashboard → **Table Editor** → **assessment_submissions** to see the data

## 🔒 **Step 5: Security Configuration (Optional)**

### **Row Level Security (RLS)**
The schema includes basic RLS policies that allow public read/write access. For production, you might want to:

1. **Restrict by email domain**:
```sql
CREATE POLICY "Allow insert for specific domains" ON assessment_submissions
  FOR INSERT WITH CHECK (email LIKE '%@yourdomain.com');
```

2. **Add authentication**:
```sql
CREATE POLICY "Users can only see their own assessments" ON assessment_submissions
  FOR SELECT USING (auth.uid()::text = user_id);
```

### **API Rate Limiting**
Consider implementing rate limiting in your Supabase Edge Functions or using a service like Cloudflare.

## 📊 **Step 6: Database Monitoring**

### **Enable Database Logs**
1. Go to **Settings** → **Database**
2. Enable **Database Logs**
3. Set up alerts for:
   - Failed queries
   - High query times
   - Storage usage

### **Set Up Analytics**
1. Go to **Analytics** in your Supabase dashboard
2. Monitor:
   - Assessment submissions per day
   - Most common KPIs selected
   - Average coaching scores
   - Geographic distribution

## 🚀 **Step 7: Production Deployment**

### **Environment Variables**
Make sure to set these in your production environment:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### **Database Backups**
1. Go to **Settings** → **Database**
2. Enable **Point-in-time recovery**
3. Set up automated backups

### **Performance Optimization**
1. **Connection Pooling**: Enable in **Settings** → **Database**
2. **Edge Functions**: For complex operations
3. **Caching**: Implement Redis for frequently accessed data

## 🔍 **Step 8: Testing Checklist**

- [ ] Assessment form submits successfully
- [ ] Data appears in Supabase dashboard
- [ ] Results page loads with real data
- [ ] Error handling works properly
- [ ] Loading states display correctly
- [ ] Form validation works
- [ ] URL parameters are preserved

## 🛠️ **Troubleshooting**

### **Common Issues**

1. **"Missing Supabase environment variables"**
   - Check your `.env` file exists
   - Verify variable names start with `VITE_`
   - Restart your dev server

2. **"Failed to submit assessment"**
   - Check Supabase dashboard for errors
   - Verify RLS policies are correct
   - Check network tab for failed requests

3. **"Data not loading"**
   - Verify assessment ID in URL
   - Check database connection
   - Review console for errors

### **Debug Mode**
Add this to your component for debugging:
```typescript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Assessment Data:', assessmentData);
```

## 📈 **Next Steps**

1. **Analytics Dashboard**: Create admin panel for viewing all submissions
2. **Email Notifications**: Set up Edge Functions for email alerts
3. **PDF Generation**: Generate downloadable results reports
4. **Data Export**: Add CSV export functionality
5. **Advanced Filtering**: Add search and filter capabilities

## 🆘 **Support**

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Discord Community**: [discord.gg/supabase](https://discord.gg/supabase)
- **GitHub Issues**: Report bugs in your project repository

---

**🎉 Congratulations!** Your coaching assessment system is now fully integrated with Supabase and ready for production use. 