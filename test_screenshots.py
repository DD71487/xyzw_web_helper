from playwright.sync_api import sync_playwright
import os

output_dir = "/workspace/test_results/screenshots"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})

    # Capture console messages
    console_logs = []
    page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

    # Capture page errors
    page_errors = []
    page.on("pageerror", lambda err: page_errors.append(str(err)))

    # 1. Home page
    print("Loading Home page...")
    page.goto("http://localhost:3000/")
    page.wait_for_load_state("networkidle")
    page.screenshot(path=f"{output_dir}/01_home.png", full_page=True)
    print("Home page screenshot saved")

    # 2. BatchDailyTasks page
    print("Loading BatchDailyTasks page...")
    page.goto("http://localhost:3000/batch-daily-tasks")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{output_dir}/02_batch_daily_tasks.png", full_page=True)
    print("BatchDailyTasks page screenshot saved")

    # 3. Profile page
    print("Loading Profile page...")
    page.goto("http://localhost:3000/profile")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{output_dir}/03_profile.png", full_page=True)
    print("Profile page screenshot saved")

    # 4. GameFeatures page
    print("Loading GameFeatures page...")
    page.goto("http://localhost:3000/game-features")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{output_dir}/04_game_features.png", full_page=True)
    print("GameFeatures page screenshot saved")

    # 5. Dashboard page
    print("Loading Dashboard page...")
    page.goto("http://localhost:3000/dashboard")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{output_dir}/05_dashboard.png", full_page=True)
    print("Dashboard page screenshot saved")

    # Save console logs
    with open(f"{output_dir}/console_logs.txt", "w") as f:
        f.write("=== Console Logs ===\n")
        for log in console_logs:
            f.write(log + "\n")
        f.write(f"\n=== Page Errors ({len(page_errors)}) ===\n")
        for err in page_errors:
            f.write(err + "\n")

    print(f"\nConsole logs: {len(console_logs)} messages")
    print(f"Page errors: {len(page_errors)} errors")

    browser.close()
    print("\nAll screenshots saved to", output_dir)
