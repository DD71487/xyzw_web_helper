from playwright.sync_api import sync_playwright
import os

output_dir = "/workspace/test_results"

def test_local():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        # 1. 测试首页
        print("=== 测试首页 ===")
        page.goto("http://localhost:8080/")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{output_dir}/local_home.png", full_page=True)
        print(f"标题: {page.title()}")
        
        # 检查导航
        nav_items = page.locator("nav a, .nav-item, [class*='nav']").all()
        print(f"导航项数量: {len(nav_items)}")
        
        # 2. 测试Profile页面
        print("\n=== 测试Profile页面 ===")
        page.goto("http://localhost:8080/#/profile")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{output_dir}/local_profile.png", full_page=True)
        
        # 检查TokenManager
        has_token_manager = page.locator("text=Token管理, text=导入, text=添加").count() > 0
        print(f"是否有Token管理: {has_token_manager}")
        
        # 3. 测试BatchDailyTasks
        print("\n=== 测试BatchDailyTasks页面 ===")
        page.goto("http://localhost:8080/#/batch-daily-tasks")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{output_dir}/local_batch.png", full_page=True)
        
        # 检查Tab
        tabs = page.locator("[role='tab'], .n-tabs-tab").all()
        print(f"Tab数量: {len(tabs)}")
        
        # 4. 测试GameFeatures
        print("\n=== 测试GameFeatures页面 ===")
        page.goto("http://localhost:8080/#/game-features")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{output_dir}/local_gamefeatures.png", full_page=True)
        
        # 检查Tab
        tabs = page.locator("[role='tab'], .n-tabs-tab").all()
        print(f"Tab数量: {len(tabs)}")
        
        # 检查控制台日志
        logs = page.evaluate("() => { return window.console_logs || []; }")
        print(f"\n控制台日志: {len(logs)} 条")
        
        browser.close()

def test_target():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        # 1. 目标网站首页
        print("\n=== 目标网站首页 ===")
        page.goto("https://xyxsw.kalpa.fun/")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)
        page.screenshot(path=f"{output_dir}/target_home.png", full_page=True)
        print(f"标题: {page.title()}")
        
        # 2. 目标网站BatchDailyTasks
        print("\n=== 目标网站BatchDailyTasks ===")
        # 需要登录，先截图登录页面
        page.screenshot(path=f"{output_dir}/target_batch.png", full_page=True)
        
        browser.close()

if __name__ == "__main__":
    test_local()
    test_target()
    print("\n=== 测试完成 ===")
