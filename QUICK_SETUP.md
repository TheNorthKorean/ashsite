# 🚀 Quick Supabase Setup (5 minutes)

## **Current Issue:**
Your assessment form shows "Failed to submit assessment" because Supabase isn't configured yet.

## **Quick Fix Options:**

### **Option 1: Set Up Supabase (Recommended - 5 minutes)**

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** and click "New Project"
3. **Create project:**
   - Name: `aestheticsales-coaching`
   - Database Password: `your-strong-password`
   - Region: Choose closest to you
4. **Wait for project to be ready** (1-2 minutes)

5. **Get your credentials:**
   - Go to **Settings** → **API**
   - Copy **Project URL** (ends with `.supabase.co`)
   - Copy **anon public** key

6. **Create `.env` file in your project root:**
```env
VITE_SUPABASE_URL=https://fcfbmzutjzseeynfwida.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_7llOLp8u69umeWi57TSRCw_d-cBenzR
```

7. **Set up database:**
   - Go to **SQL Editor** in Supabase
   - Copy the entire content of `database-schema.sql`
   - Paste and click **Run**

8. **Restart your dev server:**
```bash
npm run dev
```

### **Option 2: Demo Mode (No Setup Required)**

The app now has a **demo mode** that will:
- Show "Database not configured. Using demo mode"
- Still navigate to results page
- Work without any database setup

## **Testing:**

1. **Fill out the assessment form**
2. **Click "Complete Assessment"**
3. **You should see:**
   - ✅ **If Supabase configured:** Data saves and navigates to results
   - ✅ **If not configured:** Demo mode message, then navigates to results

## **Status Indicator:**

Look for the **Database Status** indicator in the bottom-right corner:
- 🔴 **Red:** Not configured (demo mode)
- 🟢 **Green:** Connected (full functionality)

## **Need Help?**

- Check browser console for detailed error messages
- Look at the status indicator for configuration details
- Follow the full `SUPABASE_SETUP.md` guide for detailed instructions

---

**🎯 Goal:** Get the assessment form working so you can test the full user experience! 