export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
      <p>&copy; 2024 BookQuest. All rights reserved.</p>
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
